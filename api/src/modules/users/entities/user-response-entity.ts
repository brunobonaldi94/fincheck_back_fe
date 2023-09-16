import { LoginType } from '@prisma/client';
interface UserResponseEntity {
  name: string;
  email: string;
  loginType: LoginType;
  role: string;
}

export class UserResponse {
  private name: string;
  private email: string;
  private loginType: LoginType;
  private role: string;

  constructor({ name, email, loginType, role }: UserResponseEntity) {
    this.name = name;
    this.email = email;
    this.loginType = loginType;
    this.role = role;
  }
}
