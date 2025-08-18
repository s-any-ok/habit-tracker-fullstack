import { IsString, IsOptional, IsDateString } from 'class-validator';

export class CreateHabitEntryDto {
  @IsDateString()
  completedDate: string;

  @IsOptional()
  @IsString()
  notes?: string;
}
