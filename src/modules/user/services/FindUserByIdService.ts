import ApiError from '@shared/errors/ApiError'
import { inject, injectable } from 'tsyringe'

import User from '../infra/typeorm/entities/User'

import IUserRepository from '../repositories/IUsersRepository'

@injectable()
export default class FindUserByIdService {
  constructor(
    @inject('UsersRepository')
    private UsersRepository: IUserRepository
  ) {}

  async execute(userId: User['id']): Promise<User> {
    const foundUser = await this.UsersRepository.findById(userId)

    if (!foundUser) throw new ApiError('User not found', 404)

    return foundUser
  }
}
