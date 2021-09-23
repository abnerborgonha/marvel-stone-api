import { container } from 'tsyringe'

import UsersRepository from '@modules/user/infra/typeorm/repositories/UsersRepository'
import IUsersRepository from '@modules/user/repositories/IUsersRepository'

import './providers'

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository
)
