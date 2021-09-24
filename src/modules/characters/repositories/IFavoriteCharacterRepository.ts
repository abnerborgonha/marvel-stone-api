import User from '@modules/users/infra/typeorm/entities/User'

import FavoriteCharacter from '../infra/typeorm/entities/FavoriteCharacter'

import ICreateFavoriteFavoriteCharacterDTO from '../dtos/ICreateFavoriteCharacterDTO'
import IUpdateFavoriteFavoriteCharacterDTO from '../dtos/IUpdateFavoriteCharacterDTO'

export default interface IFavoriteCharacterRepository {
  create(
    user_id: User['id'],
    data: ICreateFavoriteFavoriteCharacterDTO
  ): Promise<FavoriteCharacter>
  findAll(user_id: User['id']): Promise<FavoriteCharacter[]>
  findByMarvelId(
    marvel_id: FavoriteCharacter['id'],
    user_id: User['id']
  ): Promise<FavoriteCharacter | undefined>
  findById(
    marvel_id: FavoriteCharacter['id'],
    user_id: User['id']
  ): Promise<FavoriteCharacter | undefined>
  save(
    comic_id: FavoriteCharacter['id'],
    data: IUpdateFavoriteFavoriteCharacterDTO
  ): Promise<FavoriteCharacter | undefined>
  delete(comic_id: FavoriteCharacter['id']): Promise<void>
}
