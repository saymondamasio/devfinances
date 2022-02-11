import { isDate, parse } from 'date-fns'
import type { GetServerSideProps, NextPage } from 'next'
import Papa from 'papaparse'
import { FormEvent, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import toast from 'react-hot-toast'
import * as yup from 'yup'
import { Header } from '../components/Header'
import { api } from '../services/api'
import { Container, Main } from '../styles/pages/import.styles'
import getValidationErrors from '../utils/getValidationErrors'
import { withSSRAuth } from '../utils/withSSRAuth'

type DocData = Array<string>

type Transaction = {
  title: string
  amount: number
  created_at: Date
  category: string
}

type ErrorLine = {
  line: number
  errors: Array<string>
}

const schema = yup.object().shape({
  title: yup.string().required().max(30, 'Título muito longo'),
  amount: yup
    .number()
    .required()
    .typeError('O campo valor aceita somente números'),
  category: yup.string().required().max(15, 'Categoria muito longa'),
  created_at: yup
    .date()
    .required()
    .typeError('Data de criação inválida')
    .transform((_, originalValue) =>
      isDate(originalValue)
        ? originalValue
        : parse(originalValue, 'dd/MM/yyyy', new Date())
    ),
})

const Import: NextPage = () => {
  const { acceptedFiles, isDragReject, getRootProps, getInputProps } =
    useDropzone({
      maxFiles: 1,
      accept: 'text/csv',
      maxSize: 1024 * 10, // 10K bytes
    })

  const [errorsLine, setErrorsLine] = useState<ErrorLine[]>([])
  const [uploadingData, setUploadingData] = useState<boolean>(false)

  async function sendData(transactions: Transaction[]) {
    api.post('/transactions', { transactions })
  }

  const handleReadCSV = (e: FormEvent) => {
    e.preventDefault()
    setUploadingData(true)
    setErrorsLine([])
    if (!acceptedFiles[0]) return

    Papa.parse<DocData>(acceptedFiles[0], {
      complete: async results => {
        const transactions = results.data.map(row => ({
          title: row[0].trim(),
          amount: row[1].trim(),
          category: row[2].trim(),
          created_at: row[3].trim(),
        }))

        let error = false
        let line = 1
        let transactionsParsed = []

        for await (const transaction of transactions) {
          try {
            const transactionParsed = await schema.validate(transaction, {
              abortEarly: false,
            })

            transactionsParsed.push(transactionParsed)

            line++
          } catch (err) {
            if (err instanceof yup.ValidationError) {
              error = true
              const errorsLine = getValidationErrors(err)

              setErrorsLine(prevErrors => [
                ...prevErrors,
                {
                  line,
                  errors: Object.keys(errorsLine).map(key => errorsLine[key]),
                },
              ])
            }
          }
        }
        setUploadingData(false)

        if (error) {
          return toast.error('Arquivo csv invalido', { position: 'top-right' })
        }

        await sendData(transactionsParsed)
        toast.success('Arquivo csv importado com sucesso', {
          position: 'top-right',
        })
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

            <button disabled={uploadingData} type="submit">
              Enviar
            </button>
          </footer>
          {errorsLine.length > 0 && (
            <ul className="errors">
              {errorsLine.map(errorLine => (
                <li key={errorLine.line}>
                  <span>
                    Linha {errorLine.line}:
                    <ul>
                      {errorLine.errors.map(error => (
                        <li key={error}>{error}</li>
                      ))}
                    </ul>
                  </span>
                </li>
              ))}
            </ul>
          )}
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
