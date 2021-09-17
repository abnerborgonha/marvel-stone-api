import express, { Express } from 'express'
import cors from 'cors'

export default class Server {
  private api: Express

  constructor() {
    this.api = express()

    this.middlewares()
  }

  private middlewares() {
    this.api.use(cors())
    this.api.use(express.json())
  }

  start(port: number) {
    this.api.listen(port, () => {
      // eslint-disable-next-line
      console.log(`listening in port ${port} 💎`)
    })
  }
}
