import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsEnum,
  IsHexColor,
} from 'class-validator';
import { BankAccountType } from '../entities/bank-account.entity';

export class CreateBankAccountDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  initialBalance: number;

  @IsNotEmpty()
  @IsEnum(BankAccountType)
  type: BankAccountType;

  @IsNotEmpty()
  @IsHexColor()
  color: string;
}
