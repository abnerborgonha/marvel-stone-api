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
    { marvel_character_id }: ICreateFavoriteCharacterDTO
  ): Promise<FavoriteCharacter> {
    const createdFavoriteCharacter = this.ormRepository.create({
      marvel_character_id,
      user_id
    })

    await this.ormRepository.save(createdFavoriteCharacter)

    return createdFavoriteCharacter
  }

  async findAll(user_id: User['id']): Promise<FavoriteCharacter[]> {
    const foundFavoriteCharacters = await this.ormRepository.find({
      where: {
        user_id
      }
    })

    return foundFavoriteCharacters
  }

  async findById(
    marvel_character_id: FavoriteCharacter['id'],
    user_id: User['id']
  ): Promise<FavoriteCharacter | undefined> {
    const foundFavoriteCharacter = await this.ormRepository.findOne({
      where: {
        marvel_character_id,
        user_id
      }
    })

    return foundFavoriteCharacter
  }

  async findByMarvelId(
    marvel_character_id: FavoriteCharacter['id'],
    user_id: User['id']
  ): Promise<FavoriteCharacter | undefined> {
    const foundFavoriteCharacter = await this.ormRepository.findOne({
      where: {
        marvel_character_id,
        user_id
      }
    })

    return foundFavoriteCharacter
  }

  async delete(marvel_character_id: FavoriteCharacter['id']): Promise<void> {
    await this.ormRepository.delete(marvel_character_id)
  }

  async save(
    marvel_character_id: FavoriteCharacter['id'],
    data: ICreateFavoriteCharacterDTO
  ): Promise<FavoriteCharacter | undefined> {
    await this.ormRepository.update(marvel_character_id, { ...data })

    const foundFavoriteCharacter =
      this.ormRepository.findOne(marvel_character_id)

    return foundFavoriteCharacter
  }
}
