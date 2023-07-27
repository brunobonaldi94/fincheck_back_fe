import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { env } from 'src/shared/config/env';
import { GoogleStrategy } from './auth-services/google/google.strategy';
import { RolesService } from '../roles/roles.service';
@Module({
  imports: [
    JwtModule.register({
      signOptions: { expiresIn: '7d' },
      secret: env.jwtSecret,
      global: true,
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, GoogleStrategy, RolesService],
})
export class AuthModule {}
