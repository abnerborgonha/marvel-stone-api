import User from '@modules/users/infra/typeorm/entities/User'
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository'
import ApiError from '@shared/errors/ApiError'
import FakeFavoriteComicsRepository from '../repositories/fakes/FakeFavoriteComicRepository'
import ShowFavoriteComicService from './ShowFavoriteComicService'

let fakeFavoriteComicsRepository: FakeFavoriteComicsRepository
let fakeUsersRepository: FakeUsersRepository
let showFavoriteComicService: ShowFavoriteComicService

let fakeUser: User

describe('ShowFavoriteComicService', () => {
  beforeEach(async () => {
    fakeFavoriteComicsRepository = new FakeFavoriteComicsRepository()
    fakeUsersRepository = new FakeUsersRepository()
    showFavoriteComicService = new ShowFavoriteComicService(
      fakeFavoriteComicsRepository,
      fakeUsersRepository
    )

    fakeUser = await fakeUsersRepository.create({
      name: 'jhon Doe',
      email: 'jhondoe@email.com',
      password: '123456'
    })
  })

  it('Should be able to show the favorite comic', async () => {
    const { id } = fakeUser

    const { id: comic_id } = await fakeFavoriteComicsRepository.create(id, {
      marvel_comic_id: 'marvel_comic_id'
    })

    const foundFavoriteComic = await showFavoriteComicService.execute(
      id,
      comic_id
    )

    expect(foundFavoriteComic).toHaveProperty('id')
  })

  it('Should not be able to show a new favorite comic to an unexistent user', async () => {
    const { id } = fakeUser

    const { id: comic_id } = await fakeFavoriteComicsRepository.create(id, {
      marvel_comic_id: 'marvel_comic_id'
    })

    await expect(
      showFavoriteComicService.execute('non_existent_user', comic_id)
    ).rejects.toBeInstanceOf(ApiError)
  })
})
