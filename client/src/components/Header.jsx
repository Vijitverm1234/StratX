import React, { useContext } from 'react';
import { assets } from '../assets/assets';
import { AppContent } from '../Context/AppContext';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const { userData } = useContext(AppContent);
  const userName = userData?.name || 'there';
  const isVerify = userData?.isAccountVerified || false;
  const navigate=useNavigate()
  return (
    <>
      <div className='flex flex-col items-center mt-16 px-6 text-center relative'>
        <div className='relative mt-4'>
          <img
            src={assets.main}
            alt='User avatar'
            className='w-40 h-40 rounded-full border-4 border-gray-300'
          />
          <img
            src={assets.hand_wave}
            alt='Waving hand emoji'
            className='w-10 absolute -bottom-2 -right-4 animate-bounce'
          />
        </div>

        <h1 className='mt-6 text-2xl sm:text-4xl font-semibold text-gray-900 flex items-center gap-2'>
          <span className='text-gray-700'></span> Hey {userName}
        </h1>
        <h2 className='text-xl sm:text-5xl font-bold text-gray-800 mt-2 tracking-tight'>
          Welcome to MedVision
        </h2>

        <p className='mt-4 text-gray-600 max-w-lg leading-relaxed text-lg'>
          "Your health deserves more than guesswork — trust a doctor’s advice.
          Expert care today means a healthier tomorrow."
        </p>

        <button
          className='mt-6 flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-400 text-white text-lg font-medium px-10 py-3 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300'
          onClick={() => console.log('Get Started Clicked')}
        >
          🚀 Get Started
        </button>
      </div>

      {isVerify && (
        <div className="fixed bottom-4 right-4 z-50">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-full shadow-lg hover:bg-blue-700 transition-all"
          onClick={() => navigate('/middle')}>
            Open Dashboard
          </button>
        </div>
      )}
    </>
  );
};

export default Header;
