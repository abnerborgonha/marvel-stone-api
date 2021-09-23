import { sign, verify } from 'jsonwebtoken'

import ITokenProvider, {
  ITokenOptionsDTO,
  ITokenPayloadDTO
} from '../models/ITokenProvider'

export default class JWTTokenProvider implements ITokenProvider {
  sign(
    payload: string | Record<string, unknown>,
    secret: string,
    options: ITokenOptionsDTO
  ): string {
    const generatedToken = sign(payload, secret, options)

    return generatedToken
  }

  verify(token: string, secret: string): ITokenPayloadDTO | string {
    const decoded = verify(token, secret)

    return decoded as ITokenPayloadDTO
  }
}
