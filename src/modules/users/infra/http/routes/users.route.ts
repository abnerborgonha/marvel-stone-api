import { Router } from 'express'
import { container } from 'tsyringe'
import { celebrate, Joi, Segments } from 'celebrate'

import UserController from '../controllers/UserController'
import VerifyAuthentication from '../middlewares/VerifyAuthentication'

const UsersRouter = Router()

const userController = new UserController()

const verifyAuthentication = container.resolve(VerifyAuthentication)

UsersRouter.get('/:id', verifyAuthentication.execute, userController.show)

UsersRouter.post(
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

UsersRouter.patch(
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

UsersRouter.delete('/:id', userController.delete)

export default UsersRouter
