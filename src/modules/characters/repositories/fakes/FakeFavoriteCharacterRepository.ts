import User from '@modules/users/infra/typeorm/entities/User'
import FavoriteCharacter from '@modules/characters/infra/typeorm/entities/FavoriteCharacter'

import ICreateFavoriteFavoriteCharacterDTO from '../../dtos/ICreateFavoriteCharacterDTO'
import IFavoriteCharacterRepository from '../IFavoriteCharacterRepository'

export default class FakeFavoriteCharactersRepository
  implements IFavoriteCharacterRepository
{
  private fakeFavoriteCharacters: FavoriteCharacter[] = []

  async create(
    user_id: User['id'],
    { marvel_comic_id }: ICreateFavoriteFavoriteCharacterDTO
  ): Promise<FavoriteCharacter> {
    const createdFavoriteCharacter = new FavoriteCharacter()

    const id = String(Date.now() + Math.floor(Math.random() * 12))

    Object.assign(createdFavoriteCharacter, {
      id,
      marvel_comic_id,
      user_id,
      created_at: new Date(),
      updated_at: new Date()
    })

    this.fakeFavoriteCharacters.push(createdFavoriteCharacter)

    return createdFavoriteCharacter
  }

  async findAll(user_id: User['id']): Promise<FavoriteCharacter[]> {
    const foundFavoriteCharacters = this.fakeFavoriteCharacters.filter(
      characters => characters.user_id === user_id
    )

    return foundFavoriteCharacters
  }

  async findById(
    comic_id: FavoriteCharacter['id'],
    user_id: User['id']
  ): Promise<FavoriteCharacter | undefined> {
    const foundFavoriteCharacter = this.fakeFavoriteCharacters.find(
      comic => comic.id === comic_id && comic.user_id === user_id
    )

    return foundFavoriteCharacter
  }

  async findByMarvelId(
    marvel_id: FavoriteCharacter['marvel_comic_id'],
    user_id: User['id']
  ): Promise<FavoriteCharacter | undefined> {
    const foundFavoriteCharacter = this.fakeFavoriteCharacters.find(
      comic => comic.marvel_comic_id === marvel_id && comic.user_id === user_id
    )

    return foundFavoriteCharacter
  }

  async delete(comic_id: FavoriteCharacter['id']): Promise<void> {
    this.fakeFavoriteCharacters = this.fakeFavoriteCharacters.filter(
      comic => comic.id !== comic_id
    )
  }

  async save(
    comic_id: FavoriteCharacter['id'],
    data: ICreateFavoriteFavoriteCharacterDTO
  ): Promise<FavoriteCharacter | undefined> {
    this.fakeFavoriteCharacters = this.fakeFavoriteCharacters.map(comic =>
      comic.id === comic_id ? { ...comic, ...data } : comic
    )

    const foundFavoriteCharacter = this.fakeFavoriteCharacters.find(
      comic => comic.id === comic_id
    )

    return foundFavoriteCharacter
  }
}
