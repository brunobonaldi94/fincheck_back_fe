import {
  Body,
  Controller,
  Post,
  Get,
  UseGuards,
  Req,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto';
import { SigninDto } from './dto/signin.dto';
import { isPublic } from 'src/shared/decorators/IsPublic';
import { GoogleOauthGuard } from './auth-services/google/google-oauth.guard';
import { Response } from 'express';
import { LoginType } from './entities/auth.entities';
import { env } from 'src/shared/config/env';
import { RequestTypeWithUser } from 'src/shared/http/requestUser';

@isPublic()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  signin(@Body() signinDto: SigninDto) {
    return this.authService.signin(signinDto, LoginType.EMAIL);
  }
  @Post('signup')
  signup(@Body() signUpDto: SignUpDto) {
    return this.authService.signup(signUpDto, LoginType.EMAIL);
  }

  @Get('google')
  @UseGuards(GoogleOauthGuard)
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async googleAuth() {}

  @Get('google/callback')
  @UseGuards(GoogleOauthGuard)
  async googleAuthCallback(
    @Req() req: RequestTypeWithUser,
    @Res() res: Response,
  ) {
    const token = await this.authService.signinWithGoogle(req.user);

    res.cookie('fincheck:accessToken', token.accessToken);
    const frontEndURL = env.frontEndURL;
    res.redirect(frontEndURL);
    return token;
  }
}
