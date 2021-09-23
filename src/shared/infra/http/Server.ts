import 'dotenv/config'
import 'reflect-metadata'
import 'express-async-errors'

import cors from 'cors'
import { errors } from 'celebrate'
import express, { Express, NextFunction, Request, Response } from 'express'

import '@shared/infra/typeorm'

import '@shared/container'

import ApiError from '@shared/errors/ApiError'

import routes from './routes'

export default class Server {
  private api: Express

  constructor() {
    this.api = express()

    this.middlewares()

    this.routes()

    this.handleErrors()
  }

  private middlewares() {
    this.api.use(cors())
    this.api.use(express.json())
  }

  private routes() {
    this.api.use('/v1', routes)
  }

  start(port: number) {
    this.api.listen(port, () => {
      // eslint-disable-next-line
      console.log(`listening in port ${port} 💎`)
    })
  }

  private handleErrors() {
    this.api.use(errors())

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
