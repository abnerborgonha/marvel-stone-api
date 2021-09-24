import User from '@modules/users/infra/typeorm/entities/User'
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository'
import ApiError from '@shared/errors/ApiError'
import FakeFavoriteCharactersRepository from '../repositories/fakes/FakeFavoriteCharacterRepository'
import DeleteFavoriteCharacterService from './DeleteFavoriteCharacterService'

let fakeFavoriteCharactersRepository: FakeFavoriteCharactersRepository
let fakeUsersRepository: FakeUsersRepository
let deleteFavoriteCharacterService: DeleteFavoriteCharacterService

let fakeUser: User

describe('DeleteFavoriteCharacterService', () => {
  beforeEach(async () => {
    fakeFavoriteCharactersRepository = new FakeFavoriteCharactersRepository()
    fakeUsersRepository = new FakeUsersRepository()
    deleteFavoriteCharacterService = new DeleteFavoriteCharacterService(
      fakeFavoriteCharactersRepository,
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

    const { id: comic_id } = await fakeFavoriteCharactersRepository.create(id, {
      marvel_character_id: 'marvel_character_id'
    })

    await deleteFavoriteCharacterService.execute(id, comic_id)

    const foundComic = await fakeFavoriteCharactersRepository.findById(
      comic_id,
      id
    )

    expect(foundComic).toBeFalsy()
  })

  it('Should not be able to delete a comic from an unexistent user', async () => {
    const { id } = fakeUser

    const { id: comic_id } = await fakeFavoriteCharactersRepository.create(id, {
      marvel_character_id: 'marvel_character_id'
    })

    await expect(
      deleteFavoriteCharacterService.execute('non_existent_user', comic_id)
    ).rejects.toBeInstanceOf(ApiError)
  })

  it('Should not be able to delete an unexistent comic', async () => {
    const { id } = fakeUser

    await expect(
      deleteFavoriteCharacterService.execute(id, 'non_existent_comic')
    ).rejects.toBeInstanceOf(ApiError)
  })
})
