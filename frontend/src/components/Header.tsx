import React, { memo } from 'react';
import { useAuth } from '../contexts/AuthContext';

type Props = {
  onOpenSettings: () => void;
};

const Header: React.FC<Props> = memo(({ onOpenSettings }) => {
  const { user } = useAuth();

  return (
    <header className='bg-white dark:bg-gray-800 shadow-sm border-b dark:border-gray-700'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between items-center h-16'>
          <div className='flex items-center'>
            <div className='h-8 w-8 bg-primary-600 rounded-full flex items-center justify-center'>
              <svg
                className='h-5 w-5 text-white'
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
            <h1 className='ml-3 text-xl font-semibold text-gray-900 dark:text-white'>
              Habit Tracker
            </h1>
          </div>

          <div className='flex items-center space-x-4'>
            <div className='flex items-center space-x-2'>
              {user?.avatar && (
                <img
                  src={user.avatar}
                  alt={user.name}
                  className='h-8 w-8 rounded-full'
                />
              )}
              <span className='text-sm text-gray-700 dark:text-gray-300'>
                {user?.name}
              </span>
            </div>

            <button
              onClick={onOpenSettings}
              className='text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors'
              title='Settings'
            >
              <svg
                className='w-5 h-5'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z'
                />
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
});

Header.displayName = 'Header';

export default Header;
