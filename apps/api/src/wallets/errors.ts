import { ConflictException } from '@nestjs/common'

export class WalletNameAlreadyExistsError extends ConflictException {
  public constructor(name: string) {
    super(`Wallet with name: ${name} already exists`)
  }
}
