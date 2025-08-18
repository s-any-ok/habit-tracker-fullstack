import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HabitsService } from './habits.service';
import { HabitsController } from './habits.controller';
import { Habit } from 'src/entities';
import { HabitEntry } from 'src/entities';

@Module({
  imports: [TypeOrmModule.forFeature([Habit, HabitEntry])],
  controllers: [HabitsController],
  providers: [HabitsService],
})
export class HabitsModule {}
