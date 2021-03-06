import { container } from 'tsyringe'

import ITokenProvider from './TokenProvider/models/ITokenProvider'
import JWTTokenProvider from './TokenProvider/implementatios/JWTTokenProvider'

import '@modules/users/providers'

container.registerSingleton<ITokenProvider>('TokenProvider', JWTTokenProvider)
