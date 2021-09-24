import User from '@modules/users/infra/typeorm/entities/User'
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository'
import ApiError from '@shared/errors/ApiError'
import FakeFavoriteComicsRepository from '../repositories/fakes/FakeFavoriteComicRepository'
import DeleteFavoriteComicService from './DeleteFavoriteComicService'

let fakeFavoriteComicsRepository: FakeFavoriteComicsRepository
let fakeUsersRepository: FakeUsersRepository
let deleteFavoriteComicService: DeleteFavoriteComicService

let fakeUser: User

describe('DeleteFavoriteComicService', () => {
  beforeEach(async () => {
    fakeFavoriteComicsRepository = new FakeFavoriteComicsRepository()
    fakeUsersRepository = new FakeUsersRepository()
    deleteFavoriteComicService = new DeleteFavoriteComicService(
      fakeFavoriteComicsRepository,
      fakeUsersRepository
    )

    fakeUser = await fakeUsersRepository.create({
      name: 'jhon Doe',
      email: 'jhondoe@email.com',
      password: '123456'
    })
  })

  it('Should be able to delete the favorite comic', async () => {
    const { id } = fakeUser

    const { id: comic_id } = await fakeFavoriteComicsRepository.create(id, {
      marvel_comic_id: 'marvel_comic_id'
    })

    await deleteFavoriteComicService.execute(id, comic_id)

    const foundComic = await fakeFavoriteComicsRepository.findById(comic_id, id)

    expect(foundComic).toBeFalsy()
  })

  it('Should not be able to delete a comic from an unexistent user', async () => {
    const { id } = fakeUser

    const { id: comic_id } = await fakeFavoriteComicsRepository.create(id, {
      marvel_comic_id: 'marvel_comic_id'
    })

    await expect(
      deleteFavoriteComicService.execute('non_existent_user', comic_id)
    ).rejects.toBeInstanceOf(ApiError)
  })

  it('Should not be able to delete an unexistent comic', async () => {
    const { id } = fakeUser

    await expect(
      deleteFavoriteComicService.execute(id, 'non_existent_comic')
    ).rejects.toBeInstanceOf(ApiError)
  })
})
