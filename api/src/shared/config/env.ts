import { plainToInstance } from 'class-transformer';
import {
  IsNotEmpty,
  IsString,
  NotEquals,
  ValidateNested,
  validateSync,
} from 'class-validator';

class Env {
  @IsString()
  @IsNotEmpty()
  dbURL: string;
  @IsString()
  @IsNotEmpty()
  @NotEquals('unsecure_jwt_secret')
  jwtSecret: string;
  @ValidateNested()
  google: {
    clientID: string;
    clientSecret: string;
    callbackURL: string;
  };
  @ValidateNested()
  facebook: {
    appID: string;
    appSecret: string;
    callbackURL: string;
  };
  @IsString()
  @IsNotEmpty()
  frontEndURL: string;
}

export const env: Env = plainToInstance(Env, {
  jwtSecret: process.env.JWT_SECRET,
  dbURL: process.env.DATABASE_URL,
  google: {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
  },
  facebook: {
    appID: process.env.FACEBOOK_APP_ID,
    appSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: process.env.FACEBOOK_CALLBACK_URL,
  },
  frontEndURL: process.env.FRONTEND_URL,
});

const errors = validateSync(env);

if (errors.length > 0) {
  throw new Error(JSON.stringify(errors, null, 2));
}
