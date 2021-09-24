import { Router } from 'express'
import { container } from 'tsyringe'
import { celebrate, Joi, Segments } from 'celebrate'

import VerifyAuthentication from '@shared/infra/http/middlewares/VerifyAuthentication'
import FavoriteCharacterController from '../controllers/FavoriteCharacterController'

const charactersRouter = Router()

const comicController = new FavoriteCharacterController()

const verifyAuthentication = container.resolve(VerifyAuthentication)

charactersRouter.use((request, response, next) =>
  verifyAuthentication.execute(request, response, next)
)

charactersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      marvel_character_id: Joi.string().required()
    }
  }),
  comicController.create
)

charactersRouter.get('/', comicController.index)

charactersRouter.get('/:id', comicController.show)

charactersRouter.delete('/:id', comicController.delete)

export default charactersRouter
