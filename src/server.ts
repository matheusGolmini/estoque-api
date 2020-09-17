import express from 'express'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import config from './config/index'

const app = express()

const port = config().port || 3000

app.use(morgan('dev'))
app.use(bodyParser.json())


app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`)
})