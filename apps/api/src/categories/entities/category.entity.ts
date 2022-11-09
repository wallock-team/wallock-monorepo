import { CategoryType } from 'dtos'
import { Column, Entity, ManyToOne, Unique } from 'typeorm'
import { BaseEntity } from '../../common/base.entity'
import { User } from '../../users/entities/user.entity'

@Entity()
@Unique(['name', 'type', 'userId'])
export class Category extends BaseEntity {
  @Column()
  name: string

  @Column()
  type: CategoryType

  @Column()
  userId: number

  @ManyToOne(() => User)
  user: User
}
