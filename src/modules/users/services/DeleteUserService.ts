import { inject, injectable } from 'tsyringe'

import ApiError from '@shared/errors/ApiError'
import IUserRepository from '../repositories/IUsersRepository'

@injectable()
export default class DeleteUserService {
  constructor(
    @inject('UsersRepository')
    private UsersRepository: IUserRepository
  ) {}

  async execute(user_id: string) {
    const foundUser = await this.UsersRepository.findById(user_id)

    if (!foundUser) throw new ApiError('User does not exists.', 404)

    await this.UsersRepository.delete(user_id)
  }
}
