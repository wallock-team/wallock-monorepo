import { BaseEntity, Column, Entity, Unique } from 'typeorm'

@Entity()
@Unique('Unique Open ID', ['iss', 'sub'])
export default class OpenId extends BaseEntity {
  @Column()
  iss: string

  @Column()
  sub: string
}
