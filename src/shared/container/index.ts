import { container } from 'tsyringe'

import UsersRepository from '@modules/user/infra/typeorm/repositories/UsersRepository'
import IUsersRepository from '@modules/user/repositories/IUsersRepository'

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository
)
