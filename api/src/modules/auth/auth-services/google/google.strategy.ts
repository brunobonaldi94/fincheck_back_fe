import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { env } from '../../../../shared/config/env';
import { Strategy, VerifyCallback } from 'passport-google-oauth2';
import { UserRepository } from 'src/shared/database/repositories/users.repositories';
import { SigninGoogleDto } from './dtos/signInGoogleDto.dto';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private readonly userRepository: UserRepository) {
    super({
      clientID: env.google.clientID,
      clientSecret: env.google.clientSecret,
      callbackURL: env.google.callbackURL,
      scope: ['profile', 'email'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    const { id, name, emails, photos } = profile;

    const user: SigninGoogleDto = {
      provider: 'google',
      providerId: id,
      email: emails[0].value,
      firstName: name.givenName,
      lastName: name.familyName,
      picture: photos[0].value,
      accessToken,
      refreshToken,
    };

    done(null, user);
  }
}
