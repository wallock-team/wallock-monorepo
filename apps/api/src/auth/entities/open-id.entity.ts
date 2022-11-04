import { Column, Entity, Unique } from 'typeorm'
import { BaseEntity } from '../../common/base.entity'

@Entity()
@Unique('Unique Open ID', ['iss', 'sub'])
export class OpenId extends BaseEntity {
  @Column()
  iss: string

  @Column()
  sub: string
}
