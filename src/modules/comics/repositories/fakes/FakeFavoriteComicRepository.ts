import User from '@modules/users/infra/typeorm/entities/User'
import FavoriteComic from '@modules/comics/infra/typeorm/entities/FavoriteComic'

import ICreateFavoriteFavoriteComicDTO from '../../dtos/ICreateFavoriteComicDTO'
import IFavoriteComicRepository from '../IFavoriteComicRepository'

export default class FakeFavoriteComicsRepository
  implements IFavoriteComicRepository
{
  private fakeFavoriteComics: FavoriteComic[] = []

  async create(
    user_id: User['id'],
    { marvel_comic_id }: ICreateFavoriteFavoriteComicDTO
  ): Promise<FavoriteComic> {
    const createdFavoriteComic = new FavoriteComic()

    const id = String(Date.now() + Math.floor(Math.random() * 12))

    Object.assign(createdFavoriteComic, {
      id,
      marvel_comic_id,
      user_id,
      created_at: new Date(),
      updated_at: new Date()
    })

    this.fakeFavoriteComics.push(createdFavoriteComic)

    return createdFavoriteComic
  }

  async findAll(user_id: User['id']): Promise<FavoriteComic[] | undefined> {
    const foundFavoriteComics = this.fakeFavoriteComics.filter(
      comics => comics.user_id === user_id
    )

    return foundFavoriteComics
  }

  async findByMarvelId(
    marvel_id: FavoriteComic['marvel_comic_id'],
    user_id: User['id']
  ): Promise<FavoriteComic | undefined> {
    const foundFavoriteComic = this.fakeFavoriteComics.find(
      comic => comic.marvel_comic_id === marvel_id && comic.user_id === user_id
    )

    return foundFavoriteComic
  }

  async delete(comic_id: FavoriteComic['id']): Promise<void> {
    this.fakeFavoriteComics = this.fakeFavoriteComics.filter(
      comic => comic.id !== comic_id
    )
  }

  async save(
    comic_id: FavoriteComic['id'],
    data: ICreateFavoriteFavoriteComicDTO
  ): Promise<FavoriteComic | undefined> {
    this.fakeFavoriteComics = this.fakeFavoriteComics.map(comic =>
      comic.id === comic_id ? { ...comic, ...data } : comic
    )

    const foundFavoriteComic = this.fakeFavoriteComics.find(
      comic => comic.id === comic_id
    )

    return foundFavoriteComic
  }
}
