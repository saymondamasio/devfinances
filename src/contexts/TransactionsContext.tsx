import { createContext, ReactNode, useEffect, useState } from 'react'
import { api } from '../services/api'

interface Transaction {
  _id: number
  title: string
  amount: number
  type: 'deposit' | 'withdraw'
  category: string
  created_at: string
}

type CreateTransaction = Omit<Transaction, 'id' | 'created_at'>

interface Props {
  children: ReactNode
}

interface TransactionsContextData {
  transactions: Transaction[]
  refreshData: () => void
  createTransaction: (transaction: CreateTransaction) => Promise<void>
}

export const TransactionsContext = createContext<TransactionsContextData>(
  {} as TransactionsContextData
)

export function TransactionsProvider({ children }: Props) {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  useEffect(() => {
    refreshData()
  }, [])

  function refreshData() {
    api.get('transactions').then(response => {
      const parsedTransactions = response.data.map((transaction: any) => ({
        ...transaction,
        date: new Date(transaction.created_at),
        type: transaction.amount > 0 ? 'deposit' : 'withdraw',
      }))
      setTransactions(parsedTransactions)
    })
  }

  async function createTransaction(transactionInput: CreateTransaction) {
    const response = await api.post('transactions', {
      ...transactionInput,
      created_at: new Date(),
    })

    const { transaction } = response.data

    setTransactions([...transactions, transaction])
  }

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <TransactionsContext.Provider
      value={{
        transactions,
        createTransaction,
        refreshData,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  )
}
