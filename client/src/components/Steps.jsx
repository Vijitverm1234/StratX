import React from 'react';
import { stepsData } from '../assets1/assets';


const Steps = () => {
  return (
    <div
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className='flex flex-col items-center justify-center my-32 px-4'
    >
        <h1 className='text-4xl sm:text-5xl font-bold mb-2 text-blue-800 '>
                 How it  <span className='underline underline-offset-4 decoration-1 under font-light text-blue-700'>works</span>
            </h1 >
      <p className='text-lg mb-10 text-center text-blue-700'>
        Transform words into stunning visuals in just a few steps
      </p>

      <div className='space-y-6 w-full max-w-3xl'>
        {stepsData.map((item, index) => (
          <div
            key={index}
            className='flex items-start gap-5 p-6 sm:px-8 bg-white/80 backdrop-blur-md border border-gray-200 rounded-2xl shadow-lg transition-transform hover:scale-[1.02] cursor-pointer'
            whileHover={{ y: -4 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <img src={item.icon} width={50} alt={item.title} className='mt-1' />
            <div>
              <h2 className='text-xl sm:text-2xl font-semibold text-gray-800 mb-1'>
                {item.title}
              </h2>
              <p className='text-sm sm:text-base text-gray-600 leading-relaxed'>
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Steps;
