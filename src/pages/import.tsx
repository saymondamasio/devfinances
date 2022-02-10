import { parse } from 'date-fns'
import type { GetServerSideProps, NextPage } from 'next'
import Papa from 'papaparse'
import { FormEvent } from 'react'
import { useDropzone } from 'react-dropzone'
import toast from 'react-hot-toast'
import * as yup from 'yup'
import { Header } from '../components/Header'
import { api } from '../services/api'
import { Container, Main } from '../styles/pages/import.styles'
import { withSSRAuth } from '../utils/withSSRAuth'

type DocData = Array<string>

type Transaction = {
  title: string
  amount: number
  created_at: Date
  category: string
}

const schema = yup.object().shape({
  title: yup.string().required().max(100),
  amount: yup.number().required(),
  category: yup.string().required().max(50),
  created_at: yup.date().required(),
})

const Import: NextPage = () => {
  const { acceptedFiles, isDragReject, getRootProps, getInputProps } =
    useDropzone({
      maxFiles: 1,
      accept: 'text/csv',
      maxSize: 1024 * 10, // 10K bytes
    })

  async function sendData(transactions: Transaction[]) {
    api.post('/transactions', { transactions })
  }

  const handleReadCSV = (e: FormEvent) => {
    e.preventDefault()
    if (!acceptedFiles[0]) return

    Papa.parse<DocData>(acceptedFiles[0], {
      complete: async results => {
        try {
          const transactions = results.data.map(row => ({
            title: row[0].trim(),
            amount: Number(row[1].trim()),
            category: row[2].trim(),
            created_at: parse(row[3].trim(), 'dd/MM/yyyy', new Date()),
          }))

          transactions.forEach(transaction => {
            schema.validateSync(transaction)
          })

          await sendData(transactions)
        } catch (e) {
          console.log(e)

          toast.error('Arquivo csv invalido', { position: 'top-right' })
        }
      },
    })
  }

  return (
    <Container>
      <Header style={{ height: 92 }} />

      <Main>
        <h1>Importar uma transação</h1>

        <form onSubmit={handleReadCSV}>
          <div
            {...getRootProps({
              className: isDragReject ? 'dropzone reject' : 'dropzone',
            })}
          >
            <input {...getInputProps()} />
            {acceptedFiles.length > 0 ? (
              acceptedFiles.map(file => (
                <span key={file.name}>
                  {file.name} - {file.size} bytes
                </span>
              ))
            ) : isDragReject ? (
              <span>Arquivo invalido</span>
            ) : (
              <span>Selecione ou arraste o arquivo aqui</span>
            )}
          </div>

          <footer>
            <span>
              <img src="assets/danger.svg" alt="Tamanho maximo" />
              Permitido apenas arquivos CSV
            </span>

            <button type="submit">Enviar</button>
          </footer>
        </form>
      </Main>
    </Container>
  )
}

export default Import

export const getServerSideProps: GetServerSideProps = withSSRAuth(async ctx => {
  return {
    props: {},
  }
})
