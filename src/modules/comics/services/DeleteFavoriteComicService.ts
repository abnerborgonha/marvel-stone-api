import { inject, injectable } from 'tsyringe'

import User from '@modules/users/infra/typeorm/entities/User'
import IUserRepository from '@modules/users/repositories/IUsersRepository'

import ApiError from '@shared/errors/ApiError'
import FavoriteComic from '../infra/typeorm/entities/FavoriteComic'

import IFavoriteComicRepository from '../repositories/IFavoriteComicRepository'

@injectable()
export default class DeleteFavoriteComicService {
  constructor(
    @inject('FavoriteComicRepository')
    private FavoriteComicRepository: IFavoriteComicRepository,

    @inject('UsersRepository')
    private UsersRepository: IUserRepository
  ) {}

  async execute(
    user_id: User['id'],
    marvel_comic_id: FavoriteComic['id']
  ): Promise<void> {
    const foundUser = await this.UsersRepository.findById(user_id)

    if (!foundUser) throw new ApiError('User does not exists.', 404)

    const foundFavoriteComic = await this.FavoriteComicRepository.findById(
      marvel_comic_id,
      user_id
    )

    if (!foundFavoriteComic) throw new ApiError('Comic does not exists.', 404)

    await this.FavoriteComicRepository.delete(foundFavoriteComic.id)
  }
}
