import { Router } from 'express'
import { container } from 'tsyringe'
import { celebrate, Joi, Segments } from 'celebrate'

import VerifyAuthentication from '@shared/infra/http/middlewares/VerifyAuthentication'
import FavoriteComicController from '../controllers/FavoriteComicController'

const comicsRouter = Router()

const comicController = new FavoriteComicController()

const verifyAuthentication = container.resolve(VerifyAuthentication)

comicsRouter.use((request, response, next) =>
  verifyAuthentication.execute(request, response, next)
)

comicsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      marvel_comic_id: Joi.string().required()
    }
  }),
  comicController.create
)

comicsRouter.get('/', comicController.index)

comicsRouter.get('/:id', comicController.show)

comicsRouter.delete('/:id', comicController.delete)

export default comicsRouter
