import { ForbiddenException, Injectable } from '@nestjs/common';
import { LoginType, User } from '@prisma/client';
import { UserRepository } from 'src/shared/database/repositories/users.repositories';
import { UpdateUserDto } from './dto/update-user-dto.dto';
import { UserResponse } from './entities/user-response-entity';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}

  async getUserAllFieldsById(userId: string) {
    return await this.userRepository.findUnique({
      where: { id: userId },
    });
  }
  async getUserById(userId: string): Promise<UserResponse> {
    const userResponse = (await this.userRepository.findUnique({
      where: { id: userId },
      select: {
        name: true,
        email: true,
        loginType: true,
        role: {
          select: {
            name: true,
          },
        },
      },
    })) as User & { role: { name: string } };

    return new UserResponse({
      name: userResponse.name,
      email: userResponse.email,
      loginType: userResponse.loginType,
      role: userResponse.role.name,
    });
  }
  async updateUserById(
    userId: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UserResponse> {
    const currentUser = await this.getUserAllFieldsById(userId);
    if (
      currentUser.loginType === LoginType.GOOGLE &&
      updateUserDto.email !== currentUser.email
    ) {
      throw new ForbiddenException('Cannot update email for Google login type');
    }
    const userResponse = (await this.userRepository.update({
      where: { id: userId },
      data: {
        email: {
          set: updateUserDto.email || currentUser.email,
        },
        name: {
          set: updateUserDto.name || currentUser.name,
        },
      },
      select: {
        name: true,
        email: true,
        loginType: true,
        role: {
          select: {
            name: true,
          },
        },
      },
    })) as User & { role: { name: string } };

    return new UserResponse({
      name: userResponse.name,
      email: userResponse.email,
      loginType: userResponse.loginType,
      role: userResponse.role.name,
    });
  }
}
