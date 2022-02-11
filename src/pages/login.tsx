import { signIn } from 'next-auth/react'
import Head from 'next/head'
import { Container } from '../styles/pages/login.styles'

export default function Login() {
  return (
    <Container>
      <Head>
        <title>Login | dev.finances</title>
      </Head>
      <main>
        <img src="assets/logo.svg" alt="" />

        <h1>Bem-vindo</h1>
        <p>Controle suas finanças agora mesmo</p>
        <button
          type="button"
          onClick={() =>
            signIn('google', {
              callbackUrl: `${window.location.origin}/`,
            })
          }
        >
          <img src="assets/google.svg" alt="Google" />
          Faça login com sua conta Google
        </button>
      </main>
    </Container>
  )
}
