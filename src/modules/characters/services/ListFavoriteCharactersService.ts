import { inject, injectable } from 'tsyringe'

import User from '@modules/users/infra/typeorm/entities/User'
import IUserRepository from '@modules/users/repositories/IUsersRepository'

import ApiError from '@shared/errors/ApiError'
import FavoriteCharacter from '../infra/typeorm/entities/FavoriteCharacter'

import IFavoriteCharacterRepository from '../repositories/IFavoriteCharacterRepository'

@injectable()
export default class ListFavoriteCharactersService {
  constructor(
    @inject('FavoriteCharacterRepository')
    private FavoriteCharacterRepository: IFavoriteCharacterRepository,

    @inject('UsersRepository')
    private UsersRepository: IUserRepository
  ) {}

  async execute(user_id: User['id']): Promise<FavoriteCharacter[]> {
    const foundUser = await this.UsersRepository.findById(user_id)

    if (!foundUser) throw new ApiError('User does not exists.', 404)

    const characters = await this.FavoriteCharacterRepository.findAll(user_id)

    return characters
  }
}
