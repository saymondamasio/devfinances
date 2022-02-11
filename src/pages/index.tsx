import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import { Header } from '../components/Header'
import { Summary } from '../components/Summary'
import { TransactionsTable } from '../components/TransactionsTable'
import { Container } from '../styles/pages/home.styles'
import { withSSRAuth } from '../utils/withSSRAuth'

const Home: NextPage = () => {
  return (
    <Container>
      <Head>
        <title>Dashboard | dev.finances</title>
      </Head>
      <Header />

      <Summary />
      <TransactionsTable />
    </Container>
  )
}

export default Home

export const getServerSideProps: GetServerSideProps = withSSRAuth(async ctx => {
  return {
    props: {},
  }
})
