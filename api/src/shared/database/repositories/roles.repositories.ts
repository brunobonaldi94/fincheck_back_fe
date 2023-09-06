import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { type Prisma } from '@prisma/client';

@Injectable()
export class RolesRepository {
  constructor(private readonly prismaService: PrismaService) {}
  create(createDto: Prisma.RoleCreateArgs) {
    return this.prismaService.role.create(createDto);
  }
  findUnique(findUniqueDto: Prisma.RoleFindUniqueArgs) {
    return this.prismaService.role.findUnique(findUniqueDto);
  }
  findOne(findFirstDto: Prisma.RoleFindFirstArgsBase) {
    return this.prismaService.role.findFirst(findFirstDto);
  }
}
