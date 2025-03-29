import React, { useContext } from 'react';
import { assets } from '../assets/assets';
import { AppContent } from '../Context/AppContext';

const Header = () => {
  const { userData } = useContext(AppContent);
  const userName = userData?.name || 'Developer';

  return (
    <div className='flex flex-col items-center mt-20 px-4 text-center'>
      <img src={assets.header_img} alt="User avatar" className='w-36 h-36 rounded-full mb-6' />
      <h1 className='flex items-center gap-3 text-xl sm:text-3xl font-medium mb-2'>
        Hey {userName} <img src={assets.hand_wave} className='w-8 aspect-square' alt="Waving hand emoji" />
      </h1>
      <h2 className='text-xl sm:text-5xl font-semibold mb-4'>Welcome to our App</h2>
      <p className='mb-8 max-w-md'>
        Unlock new possibilities with our app! Track, manage, and optimize your workflow seamlessly.
      </p>
      <button 
        className='border border-gray-500 rounded-full px-8 py-2.5 hover:bg-gray-100 transition-all'
        onClick={() => console.log("Get Started Clicked")}>
        Get Started
      </button>
    </div>
  );
};

export default Header;
