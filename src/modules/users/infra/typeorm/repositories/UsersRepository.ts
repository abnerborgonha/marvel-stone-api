import { getRepository, Repository } from 'typeorm'

import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO'
import IUsersRepository from '@modules/users/repositories/IUsersRepository'

import IUpdateUserDTO from '@modules/users/dtos/IUpdateUserDTO'
import User from '../entities/User'

export default class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>

  constructor() {
    this.ormRepository = getRepository(User)
  }

  async findById(user_id: User['id']): Promise<User | undefined> {
    const foundUser = await this.ormRepository.findOne(user_id)

    return foundUser
  }

  async findByEmail(user_email: User['email']): Promise<User | undefined> {
    const foundUser = await this.ormRepository.findOne({
      where: { email: user_email }
    })

    return foundUser
  }

  async create(data: ICreateUserDTO): Promise<User> {
    const user = this.ormRepository.create(data)

    await this.ormRepository.save(user)

    return user
  }

  async save(user_id: string, user: IUpdateUserDTO): Promise<User | undefined> {
    await this.ormRepository.update(user_id, { ...user })

    const foundUser = await this.ormRepository.findOne(user_id)

    return foundUser
  }

  async delete(user_id: User['id']) {
    await this.ormRepository.delete(user_id)
  }
}
