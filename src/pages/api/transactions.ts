import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import { connectDatabase } from '../../services/mongo'

type Transaction = {
  title: string
  amount: number
  created_at: Date
  category: string
}

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const session = await getSession({ req: request })
  if (!session?.user?.email) {
    return response.status(401).json({
      message: 'You not authorized',
    })
  }
  const { email } = session.user

  try {
    const db = await connectDatabase(process.env.MONGODB_URL!)
    const usersCollection = db.collection('users')
    const user = await usersCollection.findOne({ email })
    const transactionsCollection = db.collection('transactions')

    if (!user) {
      return response.status(400).json({ error: 'User not found' })
    }

    if (request.method === 'GET') {
      const transactions = await transactionsCollection
        .find({
          user_id: user._id,
        })
        .toArray()

      return response.status(200).json(transactions)
    } else if (request.method === 'POST') {
      const { transactions } = request.body as { transactions: Transaction[] }

      transactions.forEach(async transaction => {
        const { amount, category, created_at, title } = transaction
        await transactionsCollection.insertOne({
          title,
          amount,
          category,
          created_at,
          user_id: user._id,
        })
      })

      return response.status(200).end()
    } else {
      response.setHeader('Allow', 'GET, PUT')
      response.status(405).end(`Method ${request.method} Not Allowed`)
    }
  } catch (error) {
    console.log(error)

    response.status(500).end('Error connecting to database')
  }
}
