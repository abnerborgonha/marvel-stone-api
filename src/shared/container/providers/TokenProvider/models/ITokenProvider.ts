export interface ITokenPayloadDTO {
  iat: number
  exp: number
  sub: string
}

export interface ITokenOptionsDTO {
  expiresIn: string
  subject?: string
}

export default interface ITokenProvider {
  sign(
    payload: string | Record<string, unknown>,
    secret: string,
    options?: ITokenOptionsDTO
  ): string
  verify(token: string, secret: string): ITokenPayloadDTO | string
}
