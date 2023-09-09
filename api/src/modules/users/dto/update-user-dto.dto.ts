import { Transform } from 'class-transformer';
import { IsEmail, IsString, ValidateIf } from 'class-validator';

export class UpdateUserDto {
  @ValidateIf((req) => !req.email || req.name)
  @IsString()
  name: string;

  @ValidateIf((req) => !req.name || req.email)
  @IsString()
  @IsEmail()
  @Transform(({ value }) => value.toLowerCase())
  email: string;
}
