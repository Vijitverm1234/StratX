import React, { useContext } from 'react';
import { assets } from '../assets/assets';
import { AppContent } from '../Context/AppContext';

const Header = () => {
  const { userData } = useContext(AppContent);
  const userName = userData?.name || 'Developer';

  return (
    <div className='flex flex-col items-center mt-16 px-6 text-center relative'>
      {/* Notification Badge */}
      
      
      {/* User Avatar */}
      <div className='relative'>
        <img src={assets.header_img} alt='User avatar' className='w-40 h-40 rounded-full shadow-xl border-4 border-gray-300' />
        <img src={assets.hand_wave} alt='Waving hand emoji' className='w-10 absolute -bottom-2 -right-4 animate-bounce' />
      </div>
      
      {/* Welcome Text */}
      <h1 className='mt-6 text-2xl sm:text-4xl font-semibold text-gray-900 flex items-center gap-2'>
        <span className='text-gray-700'></span> Hey {userName}
      </h1>
      <h2 className='text-xl sm:text-5xl font-extrabold text-gray-800 mt-2 tracking-tight'>Welcome to our App</h2>
      
      {/* Description */}
      <p className='mt-4 text-gray-600 max-w-lg leading-relaxed text-lg'>
        Unlock new possibilities with our app! Track, manage, and optimize your workflow seamlessly with intuitive features.
      </p>
      
      {/* CTA Button */}
      <button 
        className='mt-6 flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-lg font-medium px-10 py-3 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300'
        onClick={() => console.log('Get Started Clicked')}>
        🚀 Get Started
      </button>
    </div>
  );
};

export default Header;