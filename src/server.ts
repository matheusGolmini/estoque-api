import express from 'express'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import config from './config/index'
import 'reflect-metadata'
import './database/config'
import routers from './routers'

const app = express()

const port = config().port || 3000

app.use(morgan('dev'))
app.use(bodyParser.json())

app.use(routers)

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`)
})