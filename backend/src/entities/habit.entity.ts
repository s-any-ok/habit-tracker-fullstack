import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';
import { HabitEntry } from './habit-entry.entity';

@Entity('habits')
export class Habit {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ nullable: true })
  description?: string;

  @Column({ default: '#3B82F6' })
  color: string;

  @Column({ default: 'daily' })
  frequency: 'daily' | 'weekly' | 'monthly';

  @ManyToOne(() => User, user => user.habits, { onDelete: 'CASCADE' })
  user: User;

  @Column()
  userId: string;

  @OneToMany(() => HabitEntry, entry => entry.habit)
  entries: HabitEntry[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
