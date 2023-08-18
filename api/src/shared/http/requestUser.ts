import { Request } from 'express';
import { SigninGoogleDto } from 'src/modules/auth/auth-services/google/dtos/signInGoogleDto.dto';

export type RequestType = Request;
export interface RequestTypeWithUser extends RequestType {
  user: SigninGoogleDto;
}
