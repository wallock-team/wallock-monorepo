import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { Repository } from 'typeorm'
import { Profile } from 'passport-google-oauth20'

import { User } from 'src/users'

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>
  ) {}

  async loginOrSignUpFromGoogle(profile: Profile): Promise<User | null> {
    const openId = await this.findGoogleOpenId(profile.id)

    if (openId) {
      return openId
    } else {
      return await this.createGoogleOpenId(profile)
    }
  }

  private async findGoogleOpenId(sub: string): Promise<User | null> {
    const iss = 'https://accounts.google.com'

    return await this.userRepo.findOneBy({ iss, sub })
  }

  private async createGoogleOpenId(profile: Profile): Promise<User> {
    const iss = 'https://accounts.google.com'
    await this.userRepo.insert({
      iss,
      sub: profile.id,
      firstName: profile.name.familyName,
      lastName: profile.name.givenName
    })
    return await this.findGoogleOpenId(profile.id)
  }
}
