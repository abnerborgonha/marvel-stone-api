import { container } from 'tsyringe'

import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository'
import IUsersRepository from '@modules/users/repositories/IUsersRepository'

import './providers'

import IFavoriteComicRepository from '@modules/comics/repositories/IFavoriteComicRepository'
import FavoriteComicRepository from '@modules/comics/infra/typeorm/repositories/FavoriteComicRepository'

import IFavoriteCharacterRepository from '@modules/characters/repositories/IFavoriteCharacterRepository'
import FavoriteCharacterRepository from '@modules/characters/infra/typeorm/repositories/FavoriteCharacterRepository'

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository
)

container.registerSingleton<IFavoriteComicRepository>(
  'FavoriteComicRepository',
  FavoriteComicRepository
)

container.registerSingleton<IFavoriteCharacterRepository>(
  'FavoriteCharacterRepository',
  FavoriteCharacterRepository
)
