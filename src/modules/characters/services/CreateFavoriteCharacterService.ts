import { inject, injectable } from 'tsyringe'

import User from '@modules/users/infra/typeorm/entities/User'
import IUserRepository from '@modules/users/repositories/IUsersRepository'

import ApiError from '@shared/errors/ApiError'
import FavoriteCharacter from '../infra/typeorm/entities/FavoriteCharacter'

import IFavoriteCharacterRepository from '../repositories/IFavoriteCharacterRepository'

import ICreateFavoriteCharacterDTO from '../dtos/ICreateFavoriteCharacterDTO'

@injectable()
export default class CreateFavoriteCharacterService {
  constructor(
    @inject('FavoriteCharacterRepository')
    private FavoriteCharacterRepository: IFavoriteCharacterRepository,

    @inject('UsersRepository')
    private UsersRepository: IUserRepository
  ) {}

  async execute(
    user_id: User['id'],
    { marvel_comic_id }: ICreateFavoriteCharacterDTO
  ): Promise<FavoriteCharacter> {
    const foundUser = await this.UsersRepository.findById(user_id)

    if (!foundUser) throw new ApiError('User does not exists.', 404)

    const foundExistentFavoriteCharacter =
      await this.FavoriteCharacterRepository.findByMarvelId(
        marvel_comic_id,
        user_id
      )

    if (foundExistentFavoriteCharacter)
      throw new ApiError('Comic already exists.')

    const createdFavoriteCharacter =
      await this.FavoriteCharacterRepository.create(user_id, {
        marvel_comic_id
      })

    return createdFavoriteCharacter
  }
}
