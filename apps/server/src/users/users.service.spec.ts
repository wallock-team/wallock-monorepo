import { Repository } from 'typeorm'
import { User } from './entities/user.entity'
import { UsersService } from './users.service'

const service = new UsersService(
  {
    findOneBy: async function (where: { iss: string; sub: string }) {
      if (where.iss === 'abc' && where.sub === 'abc') return {}
      else return null
    }
  } as Repository<User>,
  null
)

describe('UsersService', () => {
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
