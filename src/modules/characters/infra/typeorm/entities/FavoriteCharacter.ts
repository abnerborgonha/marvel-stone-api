import {
  Column,
  PrimaryGeneratedColumn,
  Entity,
  UpdateDateColumn,
  CreateDateColumn,
  ManyToOne
} from 'typeorm'
import { Exclude } from 'class-transformer'

import User from '@modules/users/infra/typeorm/entities/User'

@Entity('favorite_characters')
export default class FavoriteCharacter {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  marvel_comic_id: string

  @ManyToOne(() => User)
  @Exclude()
  user_id: User['id']

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}
