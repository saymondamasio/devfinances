import { useTransactions } from '../../hooks/useTransactions'
import { Container } from './styles'

export function Summary() {
  const { transactions } = useTransactions()

  const summary = transactions.reduce(
    (acc, transaction) => {
      if (transaction.type === 'deposit') {
        acc.incomes += transaction.amount
        acc.total += transaction.amount
      } else if (transaction.type === 'withdraw') {
        acc.outcomes -= transaction.amount
        acc.total -= transaction.amount
      }

      return acc
    },
    {
      total: 0,
      incomes: 0,
      outcomes: 0,
    }
  )

  return (
    <Container>
      <div>
        <header>
          <p>Entradas</p>
          <img src="assets/income.svg" alt="Entradas" />
        </header>

        <strong>
          {Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }).format(summary.incomes)}
        </strong>
      </div>

      <div>
        <header>
          <p>Saídas</p>
          <img src="assets/outcome.svg" alt="Saídas" />
        </header>

        <strong>
          {Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }).format(summary.outcomes)}
        </strong>
      </div>

      <div className="highlight-background">
        <header>
          <p>Total</p>
          <img src="assets/total.svg" alt="Total" />
        </header>

        <strong>
          {Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }).format(summary.total)}
        </strong>
      </div>
    </Container>
  )
}
