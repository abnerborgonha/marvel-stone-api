import * as dotenv from 'dotenv'
import { ConnectionOptions } from 'typeorm'

dotenv.config()

const isDevelopment = process.env.API_ENVIRONMENT === 'development'

const config: ConnectionOptions = {
  name: 'default',
  type: 'postgres',
  host: isDevelopment ? 'localhost' : 'postgres',
  port: Number(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: [
    isDevelopment
      ? './src/modules/**/infra/typeorm/entities/*.ts'
      : './dist/modules/**/infra/typeorm/entities/*.js'
  ],
  migrations: [
    isDevelopment
      ? './src/shared/**/infra/typeorm/migrations/*.ts'
      : './dist/shared/**/infra/typeorm/migrations/*.js'
  ],
  cli: {
    migrationsDir: isDevelopment
      ? './src/shared/infra/typeorm/migrations'
      : './dist/shared/infra/typeorm/migrations'
  }
}

export = config
