import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { type Prisma } from '@prisma/client';

@Injectable()
export class UserRepository {
  constructor(private readonly prismaService: PrismaService) {}
  create(createDto: Prisma.UserCreateArgs) {
    return this.prismaService.user.create(createDto);
  }
  findUnique(findUniqueDto: Prisma.UserFindUniqueArgs) {
    return this.prismaService.user.findUnique(findUniqueDto);
  }
  findOne(findOneDto: Prisma.UserFindFirstArgs) {
    return this.prismaService.user.findFirst(findOneDto);
  }
  update(updateDto: Prisma.UserUpdateArgs) {
    return this.prismaService.user.update(updateDto);
  }
}
