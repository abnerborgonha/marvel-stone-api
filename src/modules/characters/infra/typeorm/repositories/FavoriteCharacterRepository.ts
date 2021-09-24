import { getRepository, Repository } from 'typeorm'

import User from '@modules/users/infra/typeorm/entities/User'
import FavoriteCharacter from '@modules/characters/infra/typeorm/entities/FavoriteCharacter'

import ICreateFavoriteCharacterDTO from '../../../dtos/ICreateFavoriteCharacterDTO'
import IFavoriteCharacterRepository from '../../../repositories/IFavoriteCharacterRepository'

export default class FavoriteCharactersRepository
  implements IFavoriteCharacterRepository
{
  private ormRepository: Repository<FavoriteCharacter>

  constructor() {
    this.ormRepository = getRepository(FavoriteCharacter)
  }

  async create(
    user_id: User['id'],
    { marvel_comic_id }: ICreateFavoriteCharacterDTO
  ): Promise<FavoriteCharacter> {
    const createdFavoriteCharacter = this.ormRepository.create({
      marvel_comic_id,
      user_id
    })

    await this.ormRepository.save(createdFavoriteCharacter)

    return createdFavoriteCharacter
  }

  async findAll(user_id: User['id']): Promise<FavoriteCharacter[] | undefined> {
    const foundFavoriteCharacters = await this.ormRepository.find({
      where: {
        user_id
      }
    })

    return foundFavoriteCharacters
  }

  async findById(
    comic_id: FavoriteCharacter['id'],
    user_id: User['id']
  ): Promise<FavoriteCharacter | undefined> {
    const foundFavoriteCharacter = await this.ormRepository.findOne({
      where: {
        id: comic_id,
        user_id
      }
    })

    return foundFavoriteCharacter
  }

  async findByMarvelId(
    comic_id: FavoriteCharacter['id'],
    user_id: User['id']
  ): Promise<FavoriteCharacter | undefined> {
    const foundFavoriteCharacter = await this.ormRepository.findOne({
      where: {
        comic_id,
        user_id
      }
    })

    return foundFavoriteCharacter
  }

  async delete(comic_id: FavoriteCharacter['id']): Promise<void> {
    await this.ormRepository.delete(comic_id)
  }

  async save(
    comic_id: FavoriteCharacter['id'],
    data: ICreateFavoriteCharacterDTO
  ): Promise<FavoriteCharacter | undefined> {
    await this.ormRepository.update(comic_id, { ...data })

    const foundFavoriteCharacter = this.ormRepository.findOne(comic_id)

    return foundFavoriteCharacter
  }
}
