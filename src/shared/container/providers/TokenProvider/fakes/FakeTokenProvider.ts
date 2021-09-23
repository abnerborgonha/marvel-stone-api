import ITokenProvider, {
  ITokenPayloadDTO,
  ITokenOptionsDTO
} from '../models/ITokenProvider'

export default class FakeTokenProvider implements ITokenProvider {
  sign(
    payload: string | Record<string, unknown>,
    secret: string,
    options?: ITokenOptionsDTO
  ): string {
    const generatedToken = `${JSON.stringify(payload)}_${secret}_${
      options?.expiresIn
    }`

    return generatedToken
  }

  verify(token: string, secret: string): ITokenPayloadDTO | string {
    const [payload, token_secret] = token.split('_')

    if (token_secret !== secret) return 'Invalid token.'

    const tokenPayload: ITokenPayloadDTO = {
      sub: JSON.parse(payload),
      exp: Date.now(),
      iat: Date.now() + (new Date().getTime() - Date.now())
    }

    return tokenPayload
  }
}
