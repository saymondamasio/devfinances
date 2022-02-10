import { HTMLAttributes } from 'react'
import { ActiveLink } from '../ActiveLink'
import { Container, Content } from './styles'

type Props = HTMLAttributes<HTMLDivElement>

export function Header({ ...rest }: Props) {
  return (
    <Container {...rest}>
      <Content>
        <img src="/assets/logo.svg" alt="dt money" />

        <nav>
          <ul>
            <li>
              <ActiveLink href="/" activeClassName="active">
                <a>Listagem</a>
              </ActiveLink>
            </li>

            <li>
              <ActiveLink href="/import" activeClassName="active">
                <a>Importar</a>
              </ActiveLink>
            </li>
          </ul>
        </nav>
      </Content>
    </Container>
  )
}
