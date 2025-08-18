import React, { useState, memo, useCallback, useMemo } from 'react';
import { Habit } from '../types';

type Props = {
  habit: Habit;
  isCompleted: boolean;
  onComplete: (habitId: string, date: string, notes?: string) => Promise<void>;
  onEdit?: (habit: Habit) => void;
  onDelete?: (habitId: string) => void;
};

const HabitCard: React.FC<Props> = memo(
  ({ habit, isCompleted, onComplete, onEdit, onDelete }) => {
    const [isCompleting, setIsCompleting] = useState(false);
    const [showMenu, setShowMenu] = useState(false);

    const handleComplete = useCallback(async () => {
      if (isCompleting) return;

      setIsCompleting(true);
      try {
        const today = new Date().toISOString().split('T')[0];
        await onComplete(habit.id, today);
      } catch (error) {
        console.error('Failed to complete habit:', error);
      } finally {
        setIsCompleting(false);
      }
    }, [isCompleting, onComplete, habit.id]);

    const handleEdit = useCallback(() => {
      if (onEdit) {
        onEdit(habit);
        setShowMenu(false);
      }
    }, [onEdit, habit]);

    const handleDelete = useCallback(() => {
      if (onDelete) {
        onDelete(habit.id);
        setShowMenu(false);
      }
    }, [onDelete, habit.id]);

    const toggleMenu = useCallback(() => {
      setShowMenu(!showMenu);
    }, [showMenu]);

    const frequencyText = useMemo(() => {
      switch (habit.frequency) {
        case 'daily':
          return 'Daily';
        case 'weekly':
          return 'Weekly';
        case 'monthly':
          return 'Monthly';
        default:
          return habit.frequency;
      }
    }, [habit.frequency]);

    return (
      <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow'>
        <div className='flex items-start justify-between'>
          <div className='flex items-start space-x-4 flex-1'>
            <div
              className='w-4 h-4 rounded-full mt-1 flex-shrink-0'
              style={{ backgroundColor: habit.color }}
            />

            <div className='flex-1 min-w-0'>
              <h3 className='text-lg font-semibold text-gray-900 truncate'>
                {habit.title}
              </h3>

              {habit.description && (
                <p className='text-sm text-gray-600 mt-1 line-clamp-2'>
                  {habit.description}
                </p>
              )}

              <div className='flex items-center space-x-4 mt-3'>
                <span className='text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full'>
                  {frequencyText}
                </span>

                {habit.entries && habit.entries.length > 0 && (
                  <span className='text-xs text-gray-500'>
                    {habit.entries.length} times completed
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className='flex items-center space-x-2 ml-4'>
            <button
              onClick={handleComplete}
              disabled={isCompleting}
              className={`
              w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all
              ${
                isCompleted
                  ? 'bg-green-500 border-green-500 text-white'
                  : 'border-gray-300 hover:border-green-400 hover:bg-green-50'
              }
              ${
                isCompleting
                  ? 'opacity-50 cursor-not-allowed'
                  : 'cursor-pointer'
              }
            `}
            >
              {isCompleting ? (
                <div className='animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full' />
              ) : isCompleted ? (
                <svg
                  className='w-5 h-5'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                >
                  <path
                    fillRule='evenodd'
                    d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                    clipRule='evenodd'
                  />
                </svg>
              ) : (
                <svg
                  className='w-5 h-5 text-gray-400'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M5 13l4 4L19 7'
                  />
                </svg>
              )}
            </button>

            <div className='relative'>
              <button
                onClick={toggleMenu}
                className='w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center text-gray-400 hover:text-gray-600'
              >
                <svg
                  className='w-4 h-4'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                >
                  <path d='M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z' />
                </svg>
              </button>

              {showMenu && (
                <div className='absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-10'>
                  {onEdit && (
                    <button
                      onClick={handleEdit}
                      className='block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 text-left'
                    >
                      Edit
                    </button>
                  )}
                  {onDelete && (
                    <button
                      onClick={handleDelete}
                      className='block w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 text-left'
                    >
                      Delete
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
);

HabitCard.displayName = 'HabitCard';

export default HabitCard;
