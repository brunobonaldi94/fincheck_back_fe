import { Injectable } from '@nestjs/common';
import { Role, User } from '@prisma/client';
import { UserRepository } from 'src/shared/database/repositories/users.repositories';
import { UpdateUserDto } from './dto/update-user-dto.dto';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}

  async getUserById(userId: string) {
    const userResponse = (await this.userRepository.findUnique({
      where: { id: userId },
      select: {
        name: true,
        email: true,
        role: {
          select: {
            name: true,
          },
        },
      },
    })) as User & { role: { name: string } };

    return {
      name: userResponse.name,
      email: userResponse.email,
      role: userResponse.role.name,
    };
  }
  async updateUserById(userId: string, updateUserDto: UpdateUserDto) {
    const currentUser = await this.getUserById(userId);

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
        role: {
          select: {
            name: true,
          },
        },
      },
    })) as User & { role: { name: string } };

    return {
      name: userResponse.name,
      email: userResponse.email,
      role: userResponse.role.name,
    };
  }
}
