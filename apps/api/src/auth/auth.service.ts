import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { Repository } from 'typeorm'
import { Profile } from 'passport-google-oauth20'

import { OpenId } from './entities/open-id.entity'

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(OpenId)
    private readonly openidRepo: Repository<OpenId>
  ) {}

  async loginOrSignUpFromGoogle(profile: Profile): Promise<OpenId | null> {
    const openId = await this.findGoogleOpenId(profile.id)

    if (openId) {
      return openId
    } else {
      return await this.createGoogleOpenId(profile.id)
    }
  }

  private async findGoogleOpenId(sub: string): Promise<OpenId | null> {
    const iss = 'https://accounts.google.com'

    return await this.openidRepo.findOneBy({ iss, sub })
  }

  private async createGoogleOpenId(sub: string): Promise<OpenId> {
    const iss = 'https://accounts.google.com'
    await this.openidRepo.insert({ iss, sub })
    return await this.findGoogleOpenId(sub)
  }
}
