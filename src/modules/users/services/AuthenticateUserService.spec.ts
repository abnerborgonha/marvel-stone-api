import ApiError from '@shared/errors/ApiError'

import FakaTokenProvider from '@shared/container/providers/TokenProvider/fakes/FakeTokenProvider'
import AuthenticateUserService from './AuthenticateUserService'
import CreateUserService from './CreateUserService'
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository'
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider'

let authenticateUser: AuthenticateUserService
let fakeUsersRepository: FakeUsersRepository
let fakeHashProvider: FakeHashProvider
let createUser: CreateUserService
let fakeTokenProvider: FakaTokenProvider

describe('AuthenticateUserService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository()
    fakeHashProvider = new FakeHashProvider()
    fakeTokenProvider = new FakaTokenProvider()
    authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
      fakeTokenProvider
    )
    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider)
  })

  it('Should be able to Authenticate.', async () => {
    const user = await createUser.execute({
      name: 'Jonh Doe',
      email: 'johndoe@example.com',
      password: 'password123'
    })

    const response = await authenticateUser.execute({
      email: 'johndoe@example.com',
      password: 'password123'
    })

    expect(response).toHaveProperty('token')
    expect(response.user).toEqual(user)
  })

  it('Should not be able to Authenticate with non existent user.', async () => {
    await expect(
      authenticateUser.execute({
        email: 'johndoe@example.com',
        password: 'password123'
      })
    ).rejects.toBeInstanceOf(ApiError)
  })

  it('Should not be able to Authenticate with wrong password.', async () => {
    await createUser.execute({
      name: 'Jonh Doe',
      email: 'johndoe@example.com',
      password: 'password123'
    })

    await expect(
      authenticateUser.execute({
        email: 'johndoe@example.com',
        password: 'wrong-password'
      })
    ).rejects.toBeInstanceOf(ApiError)
  })
})
