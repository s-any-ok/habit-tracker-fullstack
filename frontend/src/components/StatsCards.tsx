import React, { memo } from 'react';

type Props = {
  completedToday: number;
  totalHabits: number;
  progressPercentage: number;
};

const StatsCards: React.FC<Props> = memo(
  ({ completedToday, totalHabits, progressPercentage }) => {
    return (
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-8'>
        <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-6'>
          <div className='flex items-center'>
            <div className='flex-shrink-0'>
              <div className='w-8 h-8 bg-green-100 rounded-full flex items-center justify-center'>
                <svg
                  className='w-5 h-5 text-green-600'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                >
                  <path
                    fillRule='evenodd'
                    d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                    clipRule='evenodd'
                  />
                </svg>
              </div>
            </div>
            <div className='ml-4'>
              <p className='text-sm font-medium text-gray-600'>
                Completed Today
              </p>
              <p className='text-2xl font-semibold text-gray-900'>
                {completedToday}
              </p>
            </div>
          </div>
        </div>

        <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-6'>
          <div className='flex items-center'>
            <div className='flex-shrink-0'>
              <div className='w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center'>
                <svg
                  className='w-5 h-5 text-blue-600'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                >
                  <path d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' />
                </svg>
              </div>
            </div>
            <div className='ml-4'>
              <p className='text-sm font-medium text-gray-600'>Total Habits</p>
              <p className='text-2xl font-semibold text-gray-900'>
                {totalHabits}
              </p>
            </div>
          </div>
        </div>

        <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-6'>
          <div className='flex items-center'>
            <div className='flex-shrink-0'>
              <div className='w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center'>
                <svg
                  className='w-5 h-5 text-purple-600'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                >
                  <path d='M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z' />
                </svg>
              </div>
            </div>
            <div className='ml-4'>
              <p className='text-sm font-medium text-gray-600'>Progress</p>
              <p className='text-2xl font-semibold text-gray-900'>
                {progressPercentage}%
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

StatsCards.displayName = 'StatsCards';

export default StatsCards;
