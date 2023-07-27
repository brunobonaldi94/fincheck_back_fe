import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { TransactionType } from '../entities/category.entity';

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  icon: string;

  @IsEnum(TransactionType)
  @IsNotEmpty()
  type: TransactionType;
}
