import { Request, Response } from 'express'
import { classToClass } from 'class-transformer'

import ShowFavoriteCharacterService from '@modules/characters/services/ShowFavoriteCharacterService'
import ListFavoriteCharactersService from '@modules/characters/services/ListFavoriteCharactersService'
import CreateFavoriteCharacterService from '@modules/characters/services/CreateFavoriteCharacterService'
import DeleteFavoriteCharacterService from '@modules/characters/services/DeleteFavoriteCharacterService'

import { container } from 'tsyringe'

export default class FavoriteCharacterController {
  async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params
    const { id: user_id } = request.user

    const showFavoriteCharacter = container.resolve(
      ShowFavoriteCharacterService
    )

    const foundFavoriteCharacter = await showFavoriteCharacter.execute(
      user_id,
      id
    )

    return response.json(classToClass(foundFavoriteCharacter))
  }

  async index(request: Request, response: Response): Promise<Response> {
    const { id } = request.user

    const listComics = container.resolve(ListFavoriteCharactersService)

    const foundFavoriteCharacter = await listComics.execute(id)

    return response.json(classToClass(foundFavoriteCharacter))
  }

  async create(request: Request, response: Response): Promise<Response> {
    const { marvel_character_id } = request.body
    const { id } = request.user

    const createFavoriteCharacter = container.resolve(
      CreateFavoriteCharacterService
    )

    const comic = await createFavoriteCharacter.execute(id, {
      marvel_character_id
    })

    return response.json(classToClass(comic))
  }

  async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params
    const { id: user_id } = request.user

    const deleteFavoriteCharacter = container.resolve(
      DeleteFavoriteCharacterService
    )

    await deleteFavoriteCharacter.execute(user_id, id)

    return response.status(204).json()
  }
}
