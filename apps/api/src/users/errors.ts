import { ConflictException } from '@nestjs/common'

export class UserAlreadyExistsError extends ConflictException {
  public constructor({ iss, sub }: { iss: string; sub: string }) {
    super(
      `User with 'iss' ${iss} and 'sub' ${sub} already exists.` +
        'Please, log in instead.'
    )
  }
}
