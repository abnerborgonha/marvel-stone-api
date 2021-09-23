import { inject, injectable } from 'tsyringe'

import ApiError from '@shared/errors/ApiError'
import User from '../infra/typeorm/entities/User'

import IUpdateUserDTO from '../dtos/IUpdateUserDTO'
import IUserRepository from '../repositories/IUsersRepository'
import IHashProvider from '../providers/HashProvider/models/IHashProvider'

@injectable()
export default class UpdateUserService {
  constructor(
    @inject('UsersRepository')
    private UsersRepository: IUserRepository,
    @inject('HashProvider')
    private HashProvider: IHashProvider
  ) {}

  async execute(user_id: string, data: IUpdateUserDTO): Promise<User> {
    const { email, old_password, password: new_password } = data

    const foundUser = await this.UsersRepository.findById(user_id)

    if (!foundUser) throw new ApiError('User does not exist.', 400)

    if (email) {
      const foundExistentEmail = await this.UsersRepository.findByEmail(email)

      if (foundExistentEmail && foundExistentEmail.id !== user_id)
        throw new ApiError('Email already exists.', 400)
    }

    if (old_password && new_password) {
      const { password } = foundUser

      const isValidOldPassword = await this.HashProvider.compareHash(
        old_password,
        password
      )

      if (!isValidOldPassword)
        throw new ApiError('Password does not match.', 400)

      data.password = await this.HashProvider.generateHash(new_password)
    }

    const updatedUser = await this.UsersRepository.save(data)

    return updatedUser
  }
}
