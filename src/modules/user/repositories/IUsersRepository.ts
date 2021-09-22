import ICreateUserDTO from '../dtos/ICreateUserDTO'

import User from '../infra/typeorm/entities/User'

export default interface IUserRepository {
  create(data: ICreateUserDTO): Promise<User>
  findById(user_id: User['id']): Promise<User | undefined>
  findByEmail(user_email: User['email']): Promise<User | undefined>
  save(user: User): Promise<User>
  delete(user_id: string): Promise<void>
}
