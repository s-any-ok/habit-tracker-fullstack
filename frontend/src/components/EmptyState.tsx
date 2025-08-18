import React, { memo } from 'react';

type Props = {
  onCreateHabit: () => void;
};

const EmptyState: React.FC<Props> = memo(({ onCreateHabit }) => {
  return (
    <div className='text-center py-12'>
      <div className='w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4'>
        <svg
          className='w-12 h-12 text-gray-400'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
          />
        </svg>
      </div>
      <h3 className='text-lg font-medium text-gray-900 mb-2'>No habits yet</h3>
      <p className='text-gray-500 mb-6'>
        Create your first habit to start tracking
      </p>
      <button
        onClick={onCreateHabit}
        className='inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700'
      >
        Create Habit
      </button>
    </div>
  );
});

EmptyState.displayName = 'EmptyState';

export default EmptyState;
