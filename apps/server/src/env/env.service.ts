import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

@Injectable()
export default class EnvService {
  constructor(private readonly configService: ConfigService) {
    this.env = configService.get('ENV')
    this.oidc.google.clientId = configService.get('OIDC_GOOGLE_CLIENT_ID')
    this.oidc.google.clientSecret = configService.get(
      'OIDC_GOOGLE_CLIENT_SECRET'
    )
  }

  public readonly env: string

  public readonly oidc: {
    google: OpenIdProviderSetting
  }
}

type OpenIdProviderSetting = {
  clientId: string
  clientSecret: string
}
