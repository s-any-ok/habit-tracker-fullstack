export type User = {
  id: string;
  email: string;
  name: string;
  googleId: string;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
};

export type Habit = {
  id: string;
  title: string;
  description?: string;
  color: string;
  frequency: 'daily' | 'weekly' | 'monthly';
  userId: string;
  entries?: HabitEntry[];
  createdAt: string;
  updatedAt: string;
};

export type HabitEntry = {
  id: string;
  habitId: string;
  completedDate: string;
  notes?: string;
  createdAt: string;
};

export type CreateHabitDto = {
  title: string;
  description?: string;
  color?: string;
  frequency?: 'daily' | 'weekly' | 'monthly';
};

export type UpdateHabitDto = Partial<CreateHabitDto>;

export type CreateHabitEntryDto = {
  completedDate: string;
  notes?: string;
};
