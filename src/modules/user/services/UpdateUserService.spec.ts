import ApiError from '@shared/errors/ApiError'

import UpdateUserService from './UpdateUserService'

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository'
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider'

let fakeHashProvider: FakeHashProvider
let saveUserService: UpdateUserService
let fakeUsersRepository: FakeUsersRepository

describe('UpdateUserService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository()
    fakeHashProvider = new FakeHashProvider()
    saveUserService = new UpdateUserService(
      fakeUsersRepository,
      fakeHashProvider
    )
  })

  it('Should be able to update the user.', async () => {
    const { id } = await fakeUsersRepository.create({
      name: 'Jhon Doe',
      email: 'jhondoe@email.com',
      password: 'password123'
    })

    const updatedUser = await saveUserService.execute(id, {
      name: 'John',
      email: 'john@example.com'
    })

    expect(updatedUser.name).toBe('John')
    expect(updatedUser.email).toBe('john@example.com')
  })

  it('Should be able to update the user password.', async () => {
    const { id } = await fakeUsersRepository.create({
      name: 'Jhon Doe',
      email: 'jhondoe@email.com',
      password: 'password123'
    })

    const updatedUser = await saveUserService.execute(id, {
      password: 'new-password',
      old_password: 'password123'
    })

    expect(updatedUser.password).toBe('new-password')
  })

  it('Should not be able to update a non-existent user', async () => {
    await expect(
      saveUserService.execute('non-existent-user', {
        name: 'John Doe',
        email: 'jhondoe@email.com'
      })
    ).rejects.toBeInstanceOf(ApiError)
  })

  it('Should not be able to update the user email if it already exists.', async () => {
    await fakeUsersRepository.create({
      name: 'Jhon Doe',
      email: 'jhondoe@email.com',
      password: 'password123'
    })

    const { id } = await fakeUsersRepository.create({
      name: 'Jhon Doe',
      email: 'jhontree@email.com',
      password: 'password123'
    })

    await expect(
      saveUserService.execute(id, {
        name: 'John Tree',
        email: 'jhondoe@email.com'
      })
    ).rejects.toBeInstanceOf(ApiError)
  })

  it('Should not be able to update the password if old password is invalid.', async () => {
    const { id } = await fakeUsersRepository.create({
      name: 'John Tree',
      email: 'jhontree@email.com',
      password: 'password123'
    })

    await expect(
      saveUserService.execute(id, {
        name: 'John Tree',
        email: 'jhontree@email.com',
        password: '123password',
        old_password: 'wrong_old_password'
      })
    ).rejects.toBeInstanceOf(ApiError)
  })
})
