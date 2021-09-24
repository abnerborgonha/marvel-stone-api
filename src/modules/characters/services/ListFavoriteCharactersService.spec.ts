import User from '@modules/users/infra/typeorm/entities/User'
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository'
import ApiError from '@shared/errors/ApiError'
import FakeFavoriteCharactersRepository from '../repositories/fakes/FakeFavoriteCharacterRepository'
import ListFavoriteCharactersService from './ListFavoriteCharactersService'

let fakeFavoriteCharactersRepository: FakeFavoriteCharactersRepository
let fakeUsersRepository: FakeUsersRepository
let listFavoriteCharacterService: ListFavoriteCharactersService

let fakeUser: User

describe('ListFavoriteCharactersService', () => {
  beforeEach(async () => {
    fakeFavoriteCharactersRepository = new FakeFavoriteCharactersRepository()
    fakeUsersRepository = new FakeUsersRepository()
    listFavoriteCharacterService = new ListFavoriteCharactersService(
      fakeFavoriteCharactersRepository,
      fakeUsersRepository
    )

    fakeUser = await fakeUsersRepository.create({
      name: 'jhon Doe',
      email: 'jhondoe@email.com',
      password: '123456'
    })
  })

  it('Should be able to list all favorite characters', async () => {
    const { id } = fakeUser

    await Promise.all(
      Array.from({ length: 10 }).map(position =>
        fakeFavoriteCharactersRepository.create(id, {
          marvel_character_id: `marvel_character_id_${position}`
        })
      )
    )

    const favoriteComics = await listFavoriteCharacterService.execute(id)

    expect(favoriteComics).toHaveLength(10)
  })

  it('Should not be able to list a new favorite comic to an unexistent user', async () => {
    await expect(
      listFavoriteCharacterService.execute('non_existent_user')
    ).rejects.toBeInstanceOf(ApiError)
  })
})
