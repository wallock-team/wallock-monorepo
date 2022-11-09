import { Test } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from '../users'
import { Wallet } from './entities/wallet.entity'
import { WalletNameAlreadyExistsError } from './errors'
import { WalletsService } from './wallets.service'

describe('WalletsService', () => {
  const mockRepo = {
    findOneBy: jest.fn(),
    insert: jest.fn()
  } as any
  const service = new WalletsService(mockRepo)

  afterEach(() => {
    jest.restoreAllMocks()
  })

  describe('createWallet', () => {
    it('returns a newly created wallet when name doesnt exist', async () => {
      const NEW_WALLET = {}
      mockRepo.findOneBy
        .mockReturnValueOnce(null)
        .mockReturnValueOnce(NEW_WALLET)

      const returned = await service.createWallet({} as User, {} as Wallet)
      expect(mockRepo.insert).toBeCalledTimes(1)
      expect(returned).toBe(NEW_WALLET)
    })

    it('throws WalletNameAlreadyExistsError when name already exists', async () => {
      const EXISTING_WALLET = {}
      mockRepo.findOneBy.mockReturnValueOnce(EXISTING_WALLET)

      try {
        await service.createWallet({} as User, {} as Wallet)
      } catch (e) {
        expect(e).toBeInstanceOf(WalletNameAlreadyExistsError)
      }
    })
  })
})
