import User from '@modules/users/infra/typeorm/entities/User'
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository'
import ApiError from '@shared/errors/ApiError'
import FakeFavoriteCharactersRepository from '../repositories/fakes/FakeFavoriteCharacterRepository'
import CreateFavoriteCharacterService from './CreateFavoriteCharacterService'

let fakeFavoriteCharactersRepository: FakeFavoriteCharactersRepository
let fakeUsersRepository: FakeUsersRepository
let createFavoriteCharacterService: CreateFavoriteCharacterService

let fakeUser: User

describe('CreateFavoriteCharacterService', () => {
  beforeEach(async () => {
    fakeFavoriteCharactersRepository = new FakeFavoriteCharactersRepository()
    fakeUsersRepository = new FakeUsersRepository()
    createFavoriteCharacterService = new CreateFavoriteCharacterService(
      fakeFavoriteCharactersRepository,
      fakeUsersRepository
    )

    fakeUser = await fakeUsersRepository.create({
      name: 'jhon Doe',
      email: 'jhondoe@email.com',
      password: '123456'
    })
  })

  it('Should be able to create a new favorite comic', async () => {
    const { id } = fakeUser

    const createdComic = await createFavoriteCharacterService.execute(id, {
      marvel_comic_id: 'marvel_comic_id'
    })

    expect(createdComic).toHaveProperty('id')
    expect(createdComic.user_id).toEqual(id)
    expect(createdComic.marvel_comic_id).toEqual('marvel_comic_id')
  })

  it('Should not be able to create a new favorite comic to with an existent marvel_comic_id', async () => {
    const { id } = fakeUser

    await fakeFavoriteCharactersRepository.create(id, {
      marvel_comic_id: 'marvel_comic_id'
    })

    await expect(
      createFavoriteCharacterService.execute(id, {
        marvel_comic_id: 'marvel_comic_id'
      })
    ).rejects.toBeInstanceOf(ApiError)
  })

  it('Should not be able to create a new favorite comic to an unexistent user', async () => {
    await expect(
      createFavoriteCharacterService.execute('non_existent_user', {
        marvel_comic_id: 'marvel_comic_id'
      })
    ).rejects.toBeInstanceOf(ApiError)
  })
})
