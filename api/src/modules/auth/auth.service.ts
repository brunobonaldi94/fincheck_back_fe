import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { SigninDto } from './dto/signin.dto';
import { UserRepository } from 'src/shared/database/repositories/users.repositories';
import { compare, hash } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/signup.dto';
import { SigninGoogleDto } from './auth-services/google/dtos/signInGoogleDto.dto';
import { SignupGoogleDto } from './auth-services/google/dtos/signupGoogleDto.dto';
import { LoginType } from './entities/auth.entities';
import { RolesService } from '../roles/roles.service';
@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
    private readonly roleService: RolesService,
  ) {}
  async signin(authenticateDto: SigninDto, loginType: LoginType) {
    const { email, password } = authenticateDto;
    const user = await this.userRepository.findOne({
      where: { email, loginType: loginType },
    });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const isPasswordValid = await compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const accessToken = this.generateAccessToken(user.id);
    return {
      accessToken,
    };
  }

  async signup(signUpDto: SignUpDto, loginType: LoginType) {
    const { name, email, password } = signUpDto;
    const emailTaken = await this.userRepository.findUnique({
      where: { email },
      select: { id: true },
    });

    if (emailTaken) {
      throw new ConflictException('This E-mail is already in use.');
    }
    let hashedPassword = null;
    if (LoginType.EMAIL === loginType) {
      hashedPassword = await hash(password, 12);
    }
    const regularRole = await this.roleService.findByName('regular');
    const user = await this.userRepository.create({
      data: {
        name,
        email,
        password: hashedPassword,
        loginType: loginType,
        roleId: regularRole.id,
        categories: {
          createMany: {
            data: [
              //Income
              { name: 'Salário', icon: 'salary', type: 'INCOME' },
              { name: 'Freelance', icon: 'freelance', type: 'INCOME' },
              { name: 'Outro', icon: 'other', type: 'INCOME' },
              // Expense
              { name: 'Casa', icon: 'home', type: 'EXPENSE' },
              { name: 'Alimentação', icon: 'food', type: 'EXPENSE' },
              { name: 'Educação', icon: 'education', type: 'EXPENSE' },
              { name: 'Lazer', icon: 'fun', type: 'EXPENSE' },
              { name: 'Mercado', icon: 'grocery', type: 'EXPENSE' },
              { name: 'Roupas', icon: 'clothes', type: 'EXPENSE' },
              { name: 'Transporte', icon: 'transport', type: 'EXPENSE' },
              { name: 'Viagem', icon: 'travel', type: 'EXPENSE' },
              { name: 'Outro', icon: 'other', type: 'INCOME' },
            ],
          },
        },
      },
    });
    const accessToken = this.generateAccessToken(user.id);
    return {
      accessToken,
    };
  }

  async signinWithGoogle(signinGoogleDto: SigninGoogleDto) {
    if (!signinGoogleDto) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const userFound = await this.userRepository.findOne({
      where: { email: signinGoogleDto.email, loginType: LoginType.GOOGLE },
    });
    if (!userFound) {
      return this.signupWithGoogle(signinGoogleDto);
    }
    const accessToken = this.generateAccessToken(userFound.id);
    return {
      accessToken,
    };
  }

  async signupWithGoogle(signupGoogleDto: SignupGoogleDto) {
    const signUpDto: SignUpDto = {
      name: signupGoogleDto.firstName,
      email: signupGoogleDto.email,
      password: null,
    };
    return this.signup(signUpDto, LoginType.GOOGLE);
  }

  private generateAccessToken(userId: string) {
    return this.jwtService.sign({ sub: userId });
  }
}
