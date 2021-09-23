import ApiError from '@shared/errors/ApiError'

import FindUserByIdService from './FindUserByIdService'

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository'

import User from '../infra/typeorm/entities/User'

let findUserByIdService: FindUserByIdService
let fakeUsersRepository: FakeUsersRepository

describe('FindUserByIdService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository()
    findUserByIdService = new FindUserByIdService(fakeUsersRepository)
  })

  it('Should be able to show the user.', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Jhon Doe',
      email: 'jhondoe@email.com',
      password: 'password123'
    })

    const foundUser = await findUserByIdService.execute(user.id)

    expect(foundUser).toBeInstanceOf(User)
  })

  it('Should not be able to show a non-existent user.', async () => {
    await expect(
      findUserByIdService.execute('id_not_exist')
    ).rejects.toBeInstanceOf(ApiError)
  })
})
