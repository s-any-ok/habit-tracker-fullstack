import React, { memo } from 'react';
import { Habit } from '../types';
import HabitCard from './HabitCard';
import EmptyState from './EmptyState';

type Props = {
  habits: Habit[];
  error: string | null;
  getTodayEntry: (habit: Habit) => boolean;
  onComplete: (habitId: string, date: string, notes?: string) => Promise<void>;
  onEdit: (habit: Habit) => void;
  onDelete: (habitId: string) => void;
  onCreateHabit: () => void;
};

const HabitsSection: React.FC<Props> = memo(
  ({
    habits,
    error,
    getTodayEntry,
    onComplete,
    onEdit,
    onDelete,
    onCreateHabit,
  }) => {
    return (
      <>
        <div className='flex items-center justify-between mb-6'>
          <h2 className='text-2xl font-bold text-gray-900'>My Habits</h2>
          <button
            onClick={onCreateHabit}
            className='inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500'
          >
            <svg
              className='w-5 h-5 mr-2'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M12 6v6m0 0v6m0-6h6m-6 0H6'
              />
            </svg>
            Add Habit
          </button>
        </div>

        {error && (
          <div className='bg-red-50 border border-red-200 rounded-md p-4 mb-6'>
            <p className='text-sm text-red-600'>{error}</p>
          </div>
        )}

        {habits.length === 0 ? (
          <EmptyState onCreateHabit={onCreateHabit} />
        ) : (
          <div className='grid gap-4'>
            {habits.map(habit => (
              <HabitCard
                key={habit.id}
                habit={habit}
                isCompleted={getTodayEntry(habit)}
                onComplete={onComplete}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}
          </div>
        )}
      </>
    );
  }
);

HabitsSection.displayName = 'HabitsSection';

export default HabitsSection;
