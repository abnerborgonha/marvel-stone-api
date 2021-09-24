import { Router } from 'express'

import usersRouter from '@modules/users/infra/http/routes/users.route'
import comicsRouter from '@modules/comics/infra/http/routes/comics.route'
import sessionRouter from '@modules/users/infra/http/routes/session.route'

const routes = Router()

routes.use('/session', sessionRouter)
routes.use('/users', usersRouter)
routes.use('/favorite-comics', comicsRouter)

export default routes
