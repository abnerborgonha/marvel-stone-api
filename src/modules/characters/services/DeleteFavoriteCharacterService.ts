import { inject, injectable } from 'tsyringe'

import User from '@modules/users/infra/typeorm/entities/User'
import IUserRepository from '@modules/users/repositories/IUsersRepository'

import ApiError from '@shared/errors/ApiError'
import FavoriteCharacter from '../infra/typeorm/entities/FavoriteCharacter'

import IFavoriteCharacterRepository from '../repositories/IFavoriteCharacterRepository'

@injectable()
export default class DeleteFavoriteCharacterService {
  constructor(
    @inject('FavoriteCharacterRepository')
    private FavoriteCharacterRepository: IFavoriteCharacterRepository,

    @inject('UsersRepository')
    private UsersRepository: IUserRepository
  ) {}

  async execute(
    user_id: User['id'],
    marvel_comic_id: FavoriteCharacter['id']
  ): Promise<void> {
    const foundUser = await this.UsersRepository.findById(user_id)

    if (!foundUser) throw new ApiError('User does not exists.', 404)

    const foundFavoriteCharacter =
      await this.FavoriteCharacterRepository.findById(marvel_comic_id, user_id)

    if (!foundFavoriteCharacter)
      throw new ApiError('Comic does not exists.', 404)

    await this.FavoriteCharacterRepository.delete(foundFavoriteCharacter.id)
  }
}