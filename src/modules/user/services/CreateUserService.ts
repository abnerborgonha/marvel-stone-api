import { inject, injectable } from 'tsyringe'

import ApiError from '@shared/errors/ApiError'

import User from '../infra/typeorm/entities/User'

import ICreateUserDTO from '../dtos/ICreateUserDTO'

import IUserRepository from '../repositories/IUsersRepository'
import IHashProvider from '../providers/HashProvider/models/IHashProvider'

@injectable()
export default class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private UsersRepository: IUserRepository,

    @inject('HashProvider')
    private HashProvider: IHashProvider
  ) {}

  async execute(data: ICreateUserDTO): Promise<User> {
    const { email, password } = data

    const foundUserByEmail = await this.UsersRepository.findByEmail(email)

    if (foundUserByEmail) throw new ApiError('Email already exists', 400)

    const hashedPassword = await this.HashProvider.generateHash(password)

    const createdUser = await this.UsersRepository.create({
      ...data,
      password: hashedPassword
    })

    return createdUser
  }
}
