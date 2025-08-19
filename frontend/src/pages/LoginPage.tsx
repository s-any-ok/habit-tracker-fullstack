import React from 'react';
import { useAuth } from '../contexts/AuthContext';

const LoginPage: React.FC = () => {
  const { login } = useAuth();

  const handleGitHubLogin = () => {
    window.location.href = `${process.env.REACT_APP_API_URL || 'http://localhost:3001'}/auth/github`;
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4'>
      <div className='max-w-md w-full space-y-8'>
        <div className='text-center'>
          <h1 className='text-4xl font-bold text-gray-900 mb-2'>
            🚀 Habit Tracker
          </h1>
          <p className='text-gray-600'>
            Track your habits and build a better routine
          </p>
        </div>

        <div className='bg-white rounded-lg shadow-lg p-8'>
          <div className='space-y-6'>
            <div>
              <h2 className='text-2xl font-semibold text-gray-900 text-center mb-6'>
                Sign in to your account
              </h2>
            </div>

            <button
              onClick={handleGitHubLogin}
              className='w-full flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors duration-200'
            >
              <svg
                className='w-5 h-5 mr-3'
                fill='currentColor'
                viewBox='0 0 20 20'
              >
                <path
                  fillRule='evenodd'
                  d='M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z'
                  clipRule='evenodd'
                />
              </svg>
              Sign in with GitHub
            </button>

            <div className='text-center'>
              <p className='text-sm text-gray-600'>
                By signing in, you agree to our terms of service and privacy
                policy
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
