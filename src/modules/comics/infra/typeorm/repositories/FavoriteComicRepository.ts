import { getRepository, Repository } from 'typeorm'

import User from '@modules/users/infra/typeorm/entities/User'
import FavoriteComic from '@modules/comics/infra/typeorm/entities/FavoriteComic'

import ICreateFavoriteComicDTO from '../../../dtos/ICreateFavoriteComicDTO'
import IFavoriteComicRepository from '../../../repositories/IFavoriteComicRepository'

export default class FavoriteComicsRepository
  implements IFavoriteComicRepository
{
  private ormRepository: Repository<FavoriteComic>

  constructor() {
    this.ormRepository = getRepository(FavoriteComic)
  }

  async create(
    user_id: User['id'],
    { marvel_comic_id }: ICreateFavoriteComicDTO
  ): Promise<FavoriteComic> {
    const createdFavoriteComic = this.ormRepository.create({
      marvel_comic_id,
      user_id
    })

    await this.ormRepository.save(createdFavoriteComic)

    return createdFavoriteComic
  }

  async findAll(user_id: User['id']): Promise<FavoriteComic[]> {
    const foundFavoriteComics = await this.ormRepository.find({
      where: {
        user_id
      }
    })

    return foundFavoriteComics
  }

  async findById(
    comic_id: FavoriteComic['id'],
    user_id: User['id']
  ): Promise<FavoriteComic | undefined> {
    const foundFavoriteComic = await this.ormRepository.findOne({
      where: {
        id: comic_id,
        user_id
      }
    })

    return foundFavoriteComic
  }

  async findByMarvelId(
    comic_id: FavoriteComic['id'],
    user_id: User['id']
  ): Promise<FavoriteComic | undefined> {
    const foundFavoriteComic = await this.ormRepository.findOne({
      where: {
        comic_id,
        user_id
      }
    })

    return foundFavoriteComic
  }

  async delete(comic_id: FavoriteComic['id']): Promise<void> {
    await this.ormRepository.delete(comic_id)
  }
}
