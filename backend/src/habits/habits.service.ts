import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Habit } from 'src/entities';
import { HabitEntry } from 'src/entities';
import { User } from 'src/entities';
import { CreateHabitDto } from './dto/create-habit.dto';
import { UpdateHabitDto } from './dto/update-habit.dto';
import { CreateHabitEntryDto } from './dto/create-habit-entry.dto';

@Injectable()
export class HabitsService {
  constructor(
    @InjectRepository(Habit)
    private habitRepository: Repository<Habit>,
    @InjectRepository(HabitEntry)
    private habitEntryRepository: Repository<HabitEntry>,
  ) {}

  async create(createHabitDto: CreateHabitDto, user: User): Promise<Habit> {
    const habit = this.habitRepository.create({
      ...createHabitDto,
      userId: user.id,
    });
    return await this.habitRepository.save(habit);
  }

  async findAll(user: User): Promise<Habit[]> {
    return await this.habitRepository.find({
      where: { userId: user.id },
      relations: ['entries'],
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string, user: User): Promise<Habit> {
    const habit = await this.habitRepository.findOne({
      where: { id, userId: user.id },
      relations: ['entries'],
    });

    if (!habit) {
      throw new NotFoundException('Habit not found');
    }

    return habit;
  }

  async update(
    id: string,
    updateHabitDto: UpdateHabitDto,
    user: User,
  ): Promise<Habit> {
    const habit = await this.findOne(id, user);

    Object.assign(habit, updateHabitDto);
    return await this.habitRepository.save(habit);
  }

  async remove(id: string, user: User): Promise<void> {
    const habit = await this.findOne(id, user);
    await this.habitRepository.remove(habit);
  }

  async createEntry(
    habitId: string,
    createEntryDto: CreateHabitEntryDto,
    user: User,
  ): Promise<HabitEntry> {
    await this.findOne(habitId, user);

    const existingEntry = await this.habitEntryRepository.findOne({
      where: {
        habitId,
        completedDate: new Date(createEntryDto.completedDate),
      },
    });

    if (existingEntry) {
      Object.assign(existingEntry, createEntryDto);
      return await this.habitEntryRepository.save(existingEntry);
    }

    const entry = this.habitEntryRepository.create({
      ...createEntryDto,
      habitId,
      completedDate: new Date(createEntryDto.completedDate),
    });

    return await this.habitEntryRepository.save(entry);
  }
}
