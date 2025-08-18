import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '../auth.service';

type GoogleProfile = {
  id: string;
  name: {
    givenName: string;
    familyName: string;
  };
  emails: Array<{ value: string }>;
  photos: Array<{ value: string }>;
};

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    private configService: ConfigService,
    private authService: AuthService,
  ) {
    super({
      clientID: configService.get<string>('GOOGLE_CLIENT_ID')!,
      clientSecret: configService.get<string>('GOOGLE_CLIENT_SECRET')!,
      callbackURL: '/auth/google/callback',
      scope: ['email', 'profile'],
    });
  }

  async validate(
    _accessToken: string,
    _refreshToken: string,
    profile: GoogleProfile,
    done: VerifyCallback,
  ): Promise<any> {
    const { id, name, emails, photos } = profile;

    const user = await this.authService.validateGoogleUser({
      googleId: id,
      email: emails[0]?.value || '',
      name: `${name.givenName} ${name.familyName}`.trim(),
      avatar: photos[0]?.value?.replace('=s96-c', '=s200-c') || '',
    });

    done(null, user);
  }
}
