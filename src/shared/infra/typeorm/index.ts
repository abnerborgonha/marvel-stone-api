import { createConnection } from 'typeorm'
import * as config from '@config/ormconfig'

createConnection(config)
