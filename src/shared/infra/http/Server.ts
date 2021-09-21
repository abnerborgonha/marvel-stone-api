import 'dotenv/config'
import 'reflect-metadata'
import 'express-async-errors'

import cors from 'cors'
import express, { Express, NextFunction, Request, Response } from 'express'

import '@shared/infra/typeorm'
import ApiError from '@shared/errors/ApiError'

export default class Server {
  private api: Express

  constructor() {
    this.api = express()

    this.middlewares()

    this.handleErrors()
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

  private handleErrors() {
    this.api.use(
      (error: Error, _: Request, response: Response, __: NextFunction) => {
        if (error instanceof ApiError) {
          const { statusCode, message } = error

          return response.status(statusCode).json({
            status: 'error',
            message
          })
        }

        // eslint-disable-next-line
        console.log(error)

        return response.status(500).json({
          status: 500,
          message: 'Internal server error'
        })
      }
    )
  }
}
