import { inject, injectable } from 'tsyringe'

import ApiError from '@shared/errors/ApiError'

import User from '../infra/typeorm/entities/User'

import ICreateUserDTO from '../dtos/ICreateUserDTO'

import IUserRepository from '../repositories/IUsersRepository'

@injectable()
export default class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private UsersRepository: IUserRepository
  ) {}

  async execute(data: ICreateUserDTO): Promise<User> {
    const { email } = data

    const foundUserByEmail = await this.UsersRepository.findByEmail(email)

    if (foundUserByEmail) throw new ApiError('Email already exists', 400)

    const createdUser = await this.UsersRepository.create(data)

    return createdUser
  }
}
