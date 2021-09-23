import { Router } from 'express'

import usersRouter from '@modules/users/infra/http/routes/users.route'
import sessionRouter from '@modules/users/infra/http/routes/session.route'

const routes = Router()

routes.use('/session', sessionRouter)
routes.use('/users', usersRouter)

export default routes
