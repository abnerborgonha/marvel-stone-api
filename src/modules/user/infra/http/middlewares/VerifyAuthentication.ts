import { inject, injectable } from 'tsyringe'
import { Request, Response, NextFunction } from 'express'

import authConfig from '@config/auth'
import ApiError from '@shared/errors/ApiError'

import ITokenProvider, {
  ITokenPayloadDTO
} from '@shared/container/providers/TokenProvider/models/ITokenProvider'

@injectable()
export default class VerifyAuthentication {
  constructor(
    @inject('TokenProvider')
    private tokenProvider: ITokenProvider
  ) {}

  execute(request: Request, _: Response, next: NextFunction) {
    const authHeader = request.headers.authorization

    if (!authHeader) throw new ApiError('JWT token is missing', 401)

    const [, token] = authHeader.split('')

    try {
      const decoded = this.tokenProvider.verify(token, authConfig.jwt.secret)

      const { sub } = decoded as ITokenPayloadDTO

      request.user = {
        id: sub
      }

      return next()
    } catch (error) {
      throw new ApiError('Invalid JWT token', 401)
    }
  }
}
