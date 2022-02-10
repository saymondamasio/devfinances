import { SessionProvider } from 'next-auth/react'
import type { AppProps } from 'next/app'
import { Toaster } from 'react-hot-toast'
import { TransactionsProvider } from '../contexts/TransactionsContext'
import { GlobalStyle } from '../styles/global'

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <TransactionsProvider>
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
      <GlobalStyle />
      <Toaster />
    </TransactionsProvider>
  )
}

export default MyApp
