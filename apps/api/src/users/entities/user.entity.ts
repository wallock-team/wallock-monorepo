import { BaseEntity } from '../../common/base.entity'
import { Column, Entity, Unique } from 'typeorm'

@Entity()
@Unique(['iss', 'sub'])
export class User extends BaseEntity {
  @Column()
  iss: string

  @Column()
  sub: string

  @Column({
    nullable: true
  })
  name?: string

  @Column({ nullable: true })
  picture?: string

  @Column({ default: 0 })
  balance: number
}
