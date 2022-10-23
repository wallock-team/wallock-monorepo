export type BaseEntity = {
  id: number
  createdAt: Date
  lastUpdatedAt: Date
  deletedAt?: Date
  version: number
}
