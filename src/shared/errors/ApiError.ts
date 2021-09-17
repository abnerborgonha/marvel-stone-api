export default class ApiError {
  readonly message: string

  readonly statusCode: number

  constructor(message: string, statusCode = 400) {
    Object.assign(this, { message, statusCode })

    Object.setPrototypeOf(this, ApiError.prototype)
  }
}
