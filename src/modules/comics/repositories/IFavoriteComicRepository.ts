import User from '@modules/users/infra/typeorm/entities/User'

import FavoriteComic from '../infra/typeorm/entities/FavoriteComic'

import ICreateFavoriteFavoriteComicDTO from '../dtos/ICreateFavoriteComicDTO'
import IUpdateFavoriteFavoriteComicDTO from '../dtos/IUpdateFavoriteComicDTO'

export default interface IFavoriteComicRepository {
  create(
    user_id: User['id'],
    data: ICreateFavoriteFavoriteComicDTO
  ): Promise<FavoriteComic>
  findAll(user_id: User['id']): Promise<FavoriteComic[]>
  findByMarvelId(
    marvel_id: FavoriteComic['id'],
    user_id: User['id']
  ): Promise<FavoriteComic | undefined>
  findById(
    marvel_id: FavoriteComic['id'],
    user_id: User['id']
  ): Promise<FavoriteComic | undefined>
  save(
    comic_id: FavoriteComic['id'],
    data: IUpdateFavoriteFavoriteComicDTO
  ): Promise<FavoriteComic | undefined>
  delete(comic_id: FavoriteComic['id']): Promise<void>
}
