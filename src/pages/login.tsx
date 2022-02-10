import { signIn } from 'next-auth/react'
import Head from 'next/head'
import { Container } from '../styles/pages/login.styles'

export default function Login() {
  return (
    <Container>
      <Head>
        <title>Login | dev.finances</title>
      </Head>
      <div>
        <img src="assets/background-login.svg" alt="" />

        <main>
          <img src="assets/logo.svg" alt="" />

          <h1>Bem-vindo</h1>
          <button
            type="button"
            onClick={() =>
              signIn('google', {
                callbackUrl: `${window.location.origin}/`,
              })
            }
          >
            <img src="assets/google.svg" alt="Google" />
            Crie sua sala com o Google
          </button>
        </main>
      </div>
    </Container>
  )
}
