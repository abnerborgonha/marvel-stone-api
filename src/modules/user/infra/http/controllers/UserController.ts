import { Request, Response } from 'express'
import { classToClass } from 'class-transformer'

import CreateUserService from '@modules/user/services/CreateUserService'
import UpdateUserService from '@modules/user/services/UpdateUserService'
import DeleteUserService from '@modules/user/services/DeleteUserService'
import FindUserByIdService from '@modules/user/services/FindUserByIdService'

import { container } from 'tsyringe'

export default class UserController {
  async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    const findUserById = container.resolve(FindUserByIdService)

    const foundUser = await findUserById.execute(id)

    return response.json(classToClass(foundUser))
  }

  async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body

    const createUser = container.resolve(CreateUserService)

    const user = await createUser.execute({
      name,
      email,
      password
    })

    return response.json(classToClass(user))
  }

  async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params
    const data = request.body

    const updateUser = container.resolve(UpdateUserService)

    const user = await updateUser.execute(id, data)

    return response.json(classToClass(user))
  }

  async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    const deleteUser = container.resolve(DeleteUserService)

    await deleteUser.execute(id)

    return response.status(204)
  }
}
