import { inject, injectable } from 'tsyringe'

import User from '@modules/users/infra/typeorm/entities/User'
import IUserRepository from '@modules/users/repositories/IUsersRepository'

import ApiError from '@shared/errors/ApiError'
import FavoriteComic from '../infra/typeorm/entities/FavoriteComic'

import IFavoriteComicRepository from '../repositories/IFavoriteComicRepository'

import ICreateFavoriteComicDTO from '../dtos/ICreateFavoriteComicDTO'

@injectable()
export default class CreateFavoriteComicService {
  constructor(
    @inject('FavoriteComicRepository')
    private FavoriteComicRepository: IFavoriteComicRepository,

    @inject('UsersRepository')
    private UsersRepository: IUserRepository
  ) {}

  async execute(
    user_id: User['id'],
    { marvel_comic_id }: ICreateFavoriteComicDTO
  ): Promise<FavoriteComic> {
    const foundUser = await this.UsersRepository.findById(user_id)

    if (!foundUser) throw new ApiError('User does not exists.', 404)

    const foundExistentFavoriteComic =
      await this.FavoriteComicRepository.findByMarvelId(
        marvel_comic_id,
        user_id
      )

    if (foundExistentFavoriteComic) throw new ApiError('Comic already exists.')

    const createdFavoriteComic = await this.FavoriteComicRepository.create(
      user_id,
      { marvel_comic_id }
    )

    return createdFavoriteComic
  }
}
