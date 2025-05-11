import React from 'react';
import { assets } from '../assets1/assets';

function Description() {
  return (
    <div
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className='flex flex-col items-center justify-center my-24 px-6 md:px-20 '
    >
      <h1 className='text-4xl sm:text-5xl font-bold mb-2 text-blue-800'>
        Honoring Our <span className='underline underline-offset-4 decoration-1 font-light text-blue-600'>Heroes</span>
      </h1>

      <p className='text-blue-700 text-lg mb-12 text-center'>
        Celebrating the Unwavering Dedication of Doctors
      </p>

      <div className='flex flex-col-reverse md:flex-row gap-10 md:gap-16 items-center max-w-6xl w-full'>
        <div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 1 }}
          className='flex-1'
        >
          <h2 className='text-2xl sm:text-3xl font-semibold mb-5'>
            The Lifesaving Role of Doctors in Our Society
          </h2>
          <p className='leading-relaxed mb-4'>
            Doctors are the backbone of our healthcare system, tirelessly working to heal, comfort, and save lives. From routine checkups to life-saving surgeries, they stand at the frontlines of human well-being.
          </p>
          <p className='leading-relaxed'>
            Their dedication, compassion, and expertise inspire us every day. Let’s take a moment to appreciate the profound impact they make in our lives and communities.
          </p>
        </div>

        <img
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 1 }}
          src={assets.doctor}
          alt="Doctor image"
          className='w-80 xl:w-96 rounded-xl shadow-lg transition-all hover:scale-[1.02]'
        />
      </div>
    </div>
  );
}

export default Description;
