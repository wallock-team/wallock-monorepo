import { Column, ManyToOne } from 'typeorm'
import { BaseEntity } from 'src/common/base.entity'
import { User } from 'src/users'

export class Wallet extends BaseEntity {
  @Column({ unique: true })
  name: string

  @Column()
  userId: number

  @ManyToOne(() => User)
  user: User
}
