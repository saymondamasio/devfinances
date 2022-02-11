import { SessionProvider } from 'next-auth/react'
import type { AppProps } from 'next/app'
import { Toaster } from 'react-hot-toast'
import { TransactionsProvider } from '../contexts/TransactionsContext'
import { GlobalStyle } from '../styles/global'

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <TransactionsProvider>
        <Component {...pageProps} />
        <GlobalStyle />
        <Toaster />
      </TransactionsProvider>
    </SessionProvider>
  )
}

export default MyApp
