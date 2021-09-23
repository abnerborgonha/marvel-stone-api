import User from '@modules/user/infra/typeorm/entities/User'
import ICreateUserDTO from '@modules/user/dtos/ICreateUserDTO'

import IUserRepository from '../IUsersRepository'

export default class FakeUsersRepository implements IUserRepository {
  private fakeUsers: User[] = []

  async create(data: ICreateUserDTO): Promise<User> {
    const createdUser = new User()

    const id = String(Date.now() + Math.floor(Math.random() * 12))

    Object.assign(createdUser, {
      ...data,
      id,
      password: data.password,
      created_at: new Date(),
      updated_at: new Date()
    })

    this.fakeUsers.push(createdUser)

    return createdUser
  }

  async findById(user_id: User['id']): Promise<User | undefined> {
    const foundUser = this.fakeUsers.find(user => user.id === user_id)

    return foundUser
  }

  async findByEmail(user_email: User['email']): Promise<User | undefined> {
    const foundUser = this.fakeUsers.find(user => user.email === user_email)

    return foundUser
  }

  async delete(user_id: User['id']) {
    const filteredFakeUsers = this.fakeUsers.filter(user => user.id !== user_id)

    this.fakeUsers = filteredFakeUsers
  }

  async save(user_id: User['id'], data: User): Promise<User | undefined> {
    this.fakeUsers = this.fakeUsers.map(user =>
      user.id === user_id ? { ...user, ...data, updated_at: new Date() } : user
    )

    const foundUser = this.fakeUsers.find(user => user.id === user_id)

    return foundUser
  }
}
