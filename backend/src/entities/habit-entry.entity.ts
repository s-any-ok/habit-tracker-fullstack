import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { Habit } from './habit.entity';

@Entity('habit_entries')
export class HabitEntry {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Habit, habit => habit.entries, { onDelete: 'CASCADE' })
  habit: Habit;

  @Column()
  habitId: string;

  @Column({ type: 'date' })
  completedDate: Date;

  @Column({ nullable: true })
  notes?: string;

  @CreateDateColumn()
  createdAt: Date;
}
