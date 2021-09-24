import User from '@modules/users/infra/typeorm/entities/User'
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository'
import ApiError from '@shared/errors/ApiError'
import FakeFavoriteCharactersRepository from '../repositories/fakes/FakeFavoriteCharacterRepository'
import ShowFavoriteCharacterService from './ShowFavoriteCharacterService'

let fakeFavoriteCharactersRepository: FakeFavoriteCharactersRepository
let fakeUsersRepository: FakeUsersRepository
let showFavoriteCharacterService: ShowFavoriteCharacterService

let fakeUser: User

describe('ShowFavoriteCharacterService', () => {
  beforeEach(async () => {
    fakeFavoriteCharactersRepository = new FakeFavoriteCharactersRepository()
    fakeUsersRepository = new FakeUsersRepository()
    showFavoriteCharacterService = new ShowFavoriteCharacterService(
      fakeFavoriteCharactersRepository,
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

    const { id: comic_id } = await fakeFavoriteCharactersRepository.create(id, {
      marvel_comic_id: 'marvel_comic_id'
    })

    const foundFavoriteCharacter = await showFavoriteCharacterService.execute(
      id,
      comic_id
    )

    expect(foundFavoriteCharacter).toHaveProperty('id')
  })

  it('Should not be able to show a new favorite comic to an unexistent user', async () => {
    const { id } = fakeUser

    const { id: comic_id } = await fakeFavoriteCharactersRepository.create(id, {
      marvel_comic_id: 'marvel_comic_id'
    })

    await expect(
      showFavoriteCharacterService.execute('non_existent_user', comic_id)
    ).rejects.toBeInstanceOf(ApiError)
  })
})
