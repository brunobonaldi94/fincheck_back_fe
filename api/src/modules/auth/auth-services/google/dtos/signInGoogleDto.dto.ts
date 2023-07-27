import { Equals, IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SigninGoogleDto {
  @IsString()
  @Equals('google')
  @IsNotEmpty()
  provider: string;
  @IsString()
  @IsNotEmpty()
  providerId: string;
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @IsString()
  @IsNotEmpty()
  firstName: string;
  @IsString()
  @IsNotEmpty()
  lastName: string;
  @IsString()
  @IsNotEmpty()
  picture: string;
  @IsString()
  accessToken?: string;
  @IsString()
  refreshToken?: string;
}
