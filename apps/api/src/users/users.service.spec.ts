import { Repository } from 'typeorm'
import { User } from './entities/user.entity'
import { UserAlreadyExistsError } from './errors'
import { UsersService } from './users.service'

const service = new UsersService({
  findOneBy: async function (where: { iss: string; sub: string }) {
    if (where.iss === 'abc' && where.sub === 'abc') return {}
    else return null
  },
  insert: async function (_: any) {
    return {}
  }
} as Repository<User>)

describe('UsersService', () => {
  describe('createUser', () => {
    it('should return a User when user with `iss` and `sub` provided does not exist', async () => {
      const user = await service.createUser({
        iss: 'abc',
        sub: 'def'
      })

      expect(user).toBeDefined()
    })

    it('should throw UserAlreadyExistsError when user with `iss` and `sub` provided already exists', async () => {
      try {
        await service.createUser({
          iss: 'abc',
          sub: 'abc'
        })
      } catch (e) {
        expect(e).toBeInstanceOf(UserAlreadyExistsError)
      }
    })
  })

  describe('findUserByIssAndSub', () => {
    it('should return a user when the record with provided `sub` and `iss` exists', async () => {
      const returned = await service.findUserByIssAndSub({
        iss: 'abc',
        sub: 'abc'
      })

      expect(returned).toBeDefined()
    })

    it('should return null when `iss` parameter is missing', async () => {
      const returned = await service.findUserByIssAndSub({
        sub: 'abc'
      })

      expect(returned).toBeNull()
    })

    it('should return null when `sub` parameter is missing', async () => {
      const returned = await service.findUserByIssAndSub({
        iss: 'abc'
      })

      expect(returned).toBeNull()
    })

    it('should return null when the record with provided `sub` and `iss` does not exist', async () => {
      const returned = await service.findUserByIssAndSub({
        iss: 'abc',
        sub: 'def'
      })

      expect(returned).toBeNull()
    })
  })
})

export {}
