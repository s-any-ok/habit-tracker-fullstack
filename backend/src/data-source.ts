import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import { User } from './entities/user.entity';
import { Habit } from './entities/habit.entity';
import { HabitEntry } from './entities/habit-entry.entity';

config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [User, Habit, HabitEntry],
  migrations: [__dirname + '/migrations/*.ts'],
  synchronize: false,
  ssl: {
    rejectUnauthorized: false,
  },
});
