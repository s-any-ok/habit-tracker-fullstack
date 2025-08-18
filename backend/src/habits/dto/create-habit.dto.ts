import { IsString, IsOptional, IsIn } from 'class-validator';

export class CreateHabitDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  color?: string;

  @IsOptional()
  @IsIn(['daily', 'weekly', 'monthly'])
  frequency?: 'daily' | 'weekly' | 'monthly';
}
