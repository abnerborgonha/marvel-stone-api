import express, { Express } from 'express'
import cors from 'cors'

export default class Server {
  api: Express

  constructor() {
    this.api = express()

    this.middlewares()
  }

  private middlewares() {
    this.api.use(cors())
    this.api.use(express.json())
  }
}
