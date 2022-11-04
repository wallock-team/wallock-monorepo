import { BaseEntity } from '../../common/base.entity'
import { Column, Entity, Unique } from 'typeorm'

@Entity()
@Unique('Unique Open ID', ['iss', 'sub'])
export class User extends BaseEntity {
  @Column()
  iss: string

  @Column()
  sub: string

  @Column({
    nullable: true
  })
  firstName?: string

  @Column({
    nullable: true
  })
  lastName?: string

  @Column({ default: 0 })
  balance: number

  get fullName() {
    return `${this.firstName} ${this.lastName}`
  }
}
