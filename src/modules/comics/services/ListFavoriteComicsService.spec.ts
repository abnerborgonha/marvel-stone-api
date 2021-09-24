import User from '@modules/users/infra/typeorm/entities/User'
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository'
import ApiError from '@shared/errors/ApiError'
import FakeFavoriteComicsRepository from '../repositories/fakes/FakeFavoriteComicRepository'
import ListFavoriteComicsService from './ListFavoriteComicsService'

let fakeFavoriteComicsRepository: FakeFavoriteComicsRepository
let fakeUsersRepository: FakeUsersRepository
let listFavoriteComicService: ListFavoriteComicsService

let fakeUser: User

describe('ListFavoriteComicsService', () => {
  beforeEach(async () => {
    fakeFavoriteComicsRepository = new FakeFavoriteComicsRepository()
    fakeUsersRepository = new FakeUsersRepository()
    listFavoriteComicService = new ListFavoriteComicsService(
      fakeFavoriteComicsRepository,
      fakeUsersRepository
    )

    fakeUser = await fakeUsersRepository.create({
      name: 'jhon Doe',
      email: 'jhondoe@email.com',
      password: '123456'
    })
  })

  it('Should be able to list all favorite comics', async () => {
    const { id } = fakeUser

    await Promise.all(
      Array.from({ length: 10 }).map(position =>
        fakeFavoriteComicsRepository.create(id, {
          marvel_comic_id: `marvel_comic_id_${position}`
        })
      )
    )

    const favoriteComics = await listFavoriteComicService.execute(id)

    expect(favoriteComics).toHaveLength(10)
  })

  it('Should not be able to list a new favorite comic to an unexistent user', async () => {
    await expect(
      listFavoriteComicService.execute('non_existent_user')
    ).rejects.toBeInstanceOf(ApiError)
  })
})
