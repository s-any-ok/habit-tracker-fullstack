import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { HabitsService } from './habits.service';
import { CreateHabitDto } from './dto/create-habit.dto';
import { UpdateHabitDto } from './dto/update-habit.dto';
import { CreateHabitEntryDto } from './dto/create-habit-entry.dto';
import type { AuthenticatedRequest } from 'src/common/types/request.types';

@Controller('habits')
@UseGuards(AuthGuard('jwt'))
export class HabitsController {
  constructor(private readonly habitsService: HabitsService) {}

  @Post()
  create(
    @Body() createHabitDto: CreateHabitDto,
    @Req() req: AuthenticatedRequest,
  ) {
    return this.habitsService.create(createHabitDto, req.user);
  }

  @Get()
  findAll(@Req() req: AuthenticatedRequest) {
    return this.habitsService.findAll(req.user);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() req: AuthenticatedRequest) {
    return this.habitsService.findOne(id, req.user);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateHabitDto: UpdateHabitDto,
    @Req() req: AuthenticatedRequest,
  ) {
    return this.habitsService.update(id, updateHabitDto, req.user);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: AuthenticatedRequest) {
    return this.habitsService.remove(id, req.user);
  }

  @Post(':id/entries')
  createEntry(
    @Param('id') habitId: string,
    @Body() createEntryDto: CreateHabitEntryDto,
    @Req() req: AuthenticatedRequest,
  ) {
    return this.habitsService.createEntry(habitId, createEntryDto, req.user);
  }
}
