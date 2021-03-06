import { injectable, inject } from 'tsyringe'

import authConfig from '@config/auth'

import ApiError from '@shared/errors/ApiError'
import ITokenProvider from '@shared/container/providers/TokenProvider/models/ITokenProvider'

import User from '../infra/typeorm/entities/User'
import IUsersRepository from '../repositories/IUsersRepository'
import IHashProvider from '../providers/HashProvider/models/IHashProvider'

interface IRequest {
  email: string
  password: string
}

interface IResponse {
  user: User
  token: string
}

@injectable()
class AuthenticateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,

    @inject('TokenProvider')
    private tokenProvider: ITokenProvider
  ) {}

  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new ApiError('Incorrect email/password combinations.', 401)
    }

    const passwordMatched = await this.hashProvider.compareHash(
      password,
      user.password
    )

    if (!passwordMatched) {
      throw new ApiError('Incorrect email/password combinations.', 401)
    }

    const { secret, expiresIn } = authConfig.jwt

    const token = this.tokenProvider.sign({}, secret, {
      subject: user.id,
      expiresIn
    })

    return {
      user,
      token
    }
  }
}

export default AuthenticateUserService
