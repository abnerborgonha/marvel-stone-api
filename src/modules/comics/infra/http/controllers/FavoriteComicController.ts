import { Request, Response } from 'express'
import { classToClass } from 'class-transformer'

import ShowFavoriteComicService from '@modules/comics/services/ShowFavoriteComicService'
import ListFavoriteComicsService from '@modules/comics/services/ListFavoriteComicsService'
import CreateFavoriteComicService from '@modules/comics/services/CreateFavoriteComicService'
import DeleteFavoriteComicService from '@modules/comics/services/DeleteFavoriteComicService'

import { container } from 'tsyringe'

export default class FavoriteComicController {
  async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params
    const { id: user_id } = request.user

    const showFavoriteComic = container.resolve(ShowFavoriteComicService)

    const foundFavoriteComic = await showFavoriteComic.execute(user_id, id)

    return response.json(classToClass(foundFavoriteComic))
  }

  async index(request: Request, response: Response): Promise<Response> {
    const { id } = request.user

    const listComics = container.resolve(ListFavoriteComicsService)

    const foundFavoriteComic = await listComics.execute(id)

    return response.json(classToClass(foundFavoriteComic))
  }

  async create(request: Request, response: Response): Promise<Response> {
    const { marvel_comic_id } = request.body
    const { id } = request.user

    const createFavoriteComic = container.resolve(CreateFavoriteComicService)

    const comic = await createFavoriteComic.execute(id, {
      marvel_comic_id
    })

    return response.json(classToClass(comic))
  }

  async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params
    const { id: user_id } = request.user

    const deleteFavoriteComic = container.resolve(DeleteFavoriteComicService)

    await deleteFavoriteComic.execute(user_id, id)

    return response.status(204)
  }
}
