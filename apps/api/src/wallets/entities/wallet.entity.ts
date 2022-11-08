import { Column, Entity, ManyToOne, Unique } from 'typeorm'
import { BaseEntity } from 'src/common/base.entity'
import { User } from 'src/users'

@Entity()
@Unique('A user cannot have wallets with the same names', ['name', 'userId'])
export class Wallet extends BaseEntity {
  @Column()
  name: string

  @Column()
  userId: number

  @ManyToOne(() => User)
  user: User
}
