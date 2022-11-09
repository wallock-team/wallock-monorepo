import { ConflictException, NotFoundException } from '@nestjs/common'
import { CategoryType } from 'dtos'
import { startCase } from 'lodash'

export class CategoryAlreadyExistsError extends ConflictException {
  public constructor(name: string, type: CategoryType) {
    super(`The ${type} category named ${name} already exists`)
  }
}

// Extending NotFoundException instead of ForbiddenException
// to prevent the user from even knowing the category exists
export class CategoryNotBelongToUserError extends NotFoundException {
  public constructor() {
    super('Cannot find the requested category')
  }
}

export class CategoryNotExistError extends NotFoundException {
  public constructor() {
    super('Cannot find the requested category')
  }
}
