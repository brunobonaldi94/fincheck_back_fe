import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { UserRepository } from './repositories/users.repositories';
import { CategoryRepository } from './repositories/categories.repositories';
import { BankAccountsRepository } from './repositories/bank-accounts.repositories';
import { TransactionRepository } from './repositories/transactions.repositories';
import { RolesRepository } from './repositories/roles.repositories';
@Global()
@Module({
  providers: [
    PrismaService,
    UserRepository,
    CategoryRepository,
    BankAccountsRepository,
    TransactionRepository,
    RolesRepository,
  ],
  exports: [
    UserRepository,
    CategoryRepository,
    BankAccountsRepository,
    TransactionRepository,
    RolesRepository,
  ],
})
export class DatabaseModule {}
