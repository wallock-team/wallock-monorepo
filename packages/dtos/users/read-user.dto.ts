type ReadUserDtoContructParams = {
  id: number
  name?: string
  createdAt: Date
  lastUpdatedAt: Date
}

export default class ReadUserDto {
  public constructor(params: ReadUserDtoContructParams) {
    this.id = params.id
    this.name = params.name
    this.createdAt = params.createdAt
    this.lastUpdatedAt = params.lastUpdatedAt
  }

  public readonly id: number
  public readonly name?: string
  public readonly createdAt: Date
  public readonly lastUpdatedAt: Date
}
