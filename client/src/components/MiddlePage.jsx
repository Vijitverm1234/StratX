import React from 'react';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';

const MiddlePage = () => {
  const navigate = useNavigate();

  return (
    <div className='flex items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-br'>
      <img
        src={assets.logo}
        alt='App Logo'
        className='absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer'
        onClick={() => navigate('/')}
      />

      <div className='bg-slate-900 p-10 rounded-lg shadow-lg w-full sm:w-96 text-indigo-200 text-sm'>
        <h2 className='text-3xl font-semibold text-white text-center mb-6'>
          Continue as
        </h2>

        <div className='flex flex-row gap-4 justify-center'>
          <button
            className='bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-6 rounded-md transition-all duration-200 text-lg font-medium'
            onClick={() => navigate('/patient')}
          >
            👤 Patient
          </button>
          <button
            className='bg-green-600 hover:bg-green-700 text-white py-2 px-6 rounded-md transition-all duration-200 text-lg font-medium'
            onClick={() => navigate('/Doclogin')}
          >
            🩺 Doctor
          </button>
        </div>
      </div>
    </div>
  );
};

export default MiddlePage;
