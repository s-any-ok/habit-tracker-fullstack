import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const AuthCallbackPage: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    const handleAuthCallback = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get('token');

      if (token) {
        try {
          await login(token);
          navigate('/dashboard');
        } catch (error) {
          console.error('Login failed:', error);
          navigate('/login');
        }
      } else {
        console.error('No token received');
        navigate('/login');
      }
    };

    handleAuthCallback();
  }, [login, navigate]);

  return (
    <div className='min-h-screen bg-gray-50 flex items-center justify-center'>
      <div className='text-center'>
        <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto'></div>
        <p className='mt-4 text-gray-600'>Processing login...</p>
      </div>
    </div>
  );
};

export default AuthCallbackPage;
