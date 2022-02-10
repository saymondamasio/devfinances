import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from 'next'
import { getSession } from 'next-auth/react'

export function withSSRAuth<T>(fn: GetServerSideProps<T>) {
  return async (
    ctx: GetServerSidePropsContext
  ): Promise<GetServerSidePropsResult<T>> => {
    const session = await getSession({ req: ctx.req })

    if (!session) {
      return {
        redirect: {
          destination: '/login',
          permanent: false,
        },
      }
    }

    return await fn(ctx)
  }
}
