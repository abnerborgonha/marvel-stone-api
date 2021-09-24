import User from '@modules/users/infra/typeorm/entities/User'
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository'
import ApiError from '@shared/errors/ApiError'
import FakeFavoriteComicsRepository from '../repositories/fakes/FakeFavoriteComicRepository'
import CreateFavoriteComicService from './CreateFavoriteComicService'

let fakeFavoriteComicsRepository: FakeFavoriteComicsRepository
let fakeUsersRepository: FakeUsersRepository
let createFavoriteComicService: CreateFavoriteComicService

let fakeUser: User

describe('CreateFavoriteComicService', () => {
  beforeEach(async () => {
    fakeFavoriteComicsRepository = new FakeFavoriteComicsRepository()
    fakeUsersRepository = new FakeUsersRepository()
    createFavoriteComicService = new CreateFavoriteComicService(
      fakeFavoriteComicsRepository,
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

    const createdComic = await createFavoriteComicService.execute(id, {
      marvel_comic_id: 'marvel_comic_id'
    })

    expect(createdComic).toHaveProperty('id')
    expect(createdComic.user_id).toEqual(id)
    expect(createdComic.marvel_comic_id).toEqual('marvel_comic_id')
  })

  it('Should not be able to create a new favorite comic to with an existent marvel_comic_id', async () => {
    const { id } = fakeUser

    await fakeFavoriteComicsRepository.create(id, {
      marvel_comic_id: 'marvel_comic_id'
    })

    await expect(
      createFavoriteComicService.execute(id, {
        marvel_comic_id: 'marvel_comic_id'
      })
    ).rejects.toBeInstanceOf(ApiError)
  })

  it('Should not be able to create a new favorite comic to an unexistent user', async () => {
    await expect(
      createFavoriteComicService.execute('non_existent_user', {
        marvel_comic_id: 'marvel_comic_id'
      })
    ).rejects.toBeInstanceOf(ApiError)
  })
})
