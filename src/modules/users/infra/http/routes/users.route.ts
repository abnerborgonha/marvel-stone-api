import { Router } from 'express'
import { container } from 'tsyringe'
import { celebrate, Joi, Segments } from 'celebrate'

import VerifyAuthentication from '@shared/infra/http/middlewares/VerifyAuthentication'
import UserController from '../controllers/UserController'

const usersRouter = Router()

const userController = new UserController()

const verifyAuthentication = container.resolve(VerifyAuthentication)

usersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(8).required()
    }
  }),
  userController.create
)

usersRouter.use((request, response, next) =>
  verifyAuthentication.execute(request, response, next)
)

usersRouter.get('/:id', userController.show)

usersRouter.patch(
  '/:id',
  celebrate({
    [Segments.BODY]: Joi.object()
      .keys({
        name: Joi.string().optional(),
        email: Joi.string().email().optional(),
        password: Joi.string().min(8).optional(),
        old_password: Joi.string().min(8).optional()
      })
      .with('password', 'old_password')
  }),
  userController.update
)

usersRouter.delete('/:id', userController.delete)

export default usersRouter
