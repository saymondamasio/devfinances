import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { connectDatabase } from '../../../services/mongo'

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      // authorization: {
      //   params: {
      //     prompt: 'consent',
      //     access_type: 'offline',
      //     response_type: 'code',
      //   },
      // },
    }),
  ],
  secret: process.env.NEXT_AUTH_SECRET,
  callbacks: {
    async signIn({ user }) {
      const { email, name, image } = user

      try {
        const db = await connectDatabase(process.env.MONGODB_URL!)
        const collection = db.collection('users')

        const userExists = await collection.findOne({ email })
        if (!userExists) {
          await collection.insertOne({
            email,
            name,
            image,
          })
        }

        return true
      } catch (error) {
        console.log('Error in MongoDB: ' + error)

        return '/unauthorized'
      }
    },
  },
})
