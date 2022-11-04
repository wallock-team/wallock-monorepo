import { Profile } from 'passport-google-oauth20'
import { AuthService } from './auth.service'

const service = new AuthService(null)
const prototype = Object.getPrototypeOf(service)

describe('AuthService', () => {
  afterEach(() => {
    jest.restoreAllMocks()
  })

  describe('loginOrSignUpFromGoogle', () => {
    it('returns the existing OpenId when `subject` exists in db', async () => {
      jest.spyOn(prototype, 'findGoogleOpenId').mockImplementation(() => ({}))

      const createGoogleOpenId = jest
        .spyOn(prototype, 'createGoogleOpenId')
        .mockImplementation(() => ({}))

      const returned = await service.loginOrSignUpFromGoogle({} as Profile)

      expect(returned).toBeDefined()
      expect(createGoogleOpenId).toBeCalledTimes(0)
    })

    it('returns a new OpenId when `subject` doesnt exists in db', async () => {
      jest.spyOn(prototype, 'findGoogleOpenId').mockImplementation(() => null)

      const createGoogleOpenId = jest
        .spyOn(prototype, 'createGoogleOpenId')
        .mockImplementation(() => ({}))

      const returned = await service.loginOrSignUpFromGoogle({} as Profile)

      expect(returned).toBeDefined()
      expect(createGoogleOpenId).toBeCalledTimes(1)
    })
  })
})

export {}
