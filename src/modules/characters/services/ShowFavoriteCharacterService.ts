import { inject, injectable } from 'tsyringe'

import User from '@modules/users/infra/typeorm/entities/User'
import IUserRepository from '@modules/users/repositories/IUsersRepository'

import ApiError from '@shared/errors/ApiError'
import FavoriteCharacter from '../infra/typeorm/entities/FavoriteCharacter'

import IFavoriteCharacterRepository from '../repositories/IFavoriteCharacterRepository'

@injectable()
export default class ShowFavoriteCharacterService {
  constructor(
    @inject('FavoriteCharacterRepository')
    private FavoriteCharacterRepository: IFavoriteCharacterRepository,

    @inject('UsersRepository')
    private UsersRepository: IUserRepository
  ) {}

  async execute(
    user_id: User['id'],
    marvel_character_id: FavoriteCharacter['id']
  ): Promise<FavoriteCharacter | undefined> {
    const foundUser = await this.UsersRepository.findById(user_id)

    if (!foundUser) throw new ApiError('User does not exists.', 404)

    const foundFavoriteCharacter =
      await this.FavoriteCharacterRepository.findById(
        marvel_character_id,
        user_id
      )

    return foundFavoriteCharacter
  }
}
