import ApiError from '@shared/errors/ApiError'
import DeleteUserService from './DeleteUserService'
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository'

let fakeUsersRepository: FakeUsersRepository
let deleteUserService: DeleteUserService

describe('DeleteUserService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository()
    deleteUserService = new DeleteUserService(fakeUsersRepository)
  })

  it('Should be able to delete an user', async () => {
    const { id } = await fakeUsersRepository.create({
      name: 'Jhon Doe',
      email: 'jhondoe@email.com',
      password: 'password123'
    })

    await deleteUserService.execute(id)

    const foundUserRepository = await fakeUsersRepository.findById(id)

    expect(foundUserRepository).toBeFalsy()
  })

  it('Should not be able to delete a non-existent user', async () => {
    await expect(
      deleteUserService.execute('non_existent_user')
    ).rejects.toBeInstanceOf(ApiError)
  })
})
