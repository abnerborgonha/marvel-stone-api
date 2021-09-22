import ApiError from '@shared/errors/ApiError'

import CreateUsersService from './CreateUserService'
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository'

let createUsersService: CreateUsersService
let fakeUsersRepository: FakeUsersRepository

describe('CreateUserService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository()
    createUsersService = new CreateUsersService(fakeUsersRepository)
  })

  it('Should be able to create a new user.', async () => {
    const user = await createUsersService.execute({
      name: 'Jhon Doe',
      email: 'jhondoe@email.com',
      password: 'password123'
    })

    expect(user).toHaveProperty('id')
    expect(user.email).toEqual('jhondoe@email.com')
  })

  it('Should not be able to create a new user with an existent email.', async () => {
    const existentUserEmail = 'jhondoe@email.com'

    await fakeUsersRepository.create({
      name: 'Jhon Doe',
      email: existentUserEmail,
      password: 'password123'
    })

    await expect(
      createUsersService.execute({
        name: 'Jhon Tree',
        email: existentUserEmail,
        password: 'password123'
      })
    ).rejects.toBeInstanceOf(ApiError)
  })
})
