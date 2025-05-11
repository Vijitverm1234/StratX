import React, { useContext, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';
import axios from 'axios';
import { AppContent } from '../Context/AppContext';
import { toast } from 'react-toastify';

const VerifyEmail = () => {
  axios.defaults.withCredentials = true;
  const { backendUrl, getUserData, userData, isLoggedIn } = useContext(AppContent);
  const inputRefs = useRef([]);
  const navigate = useNavigate();

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  useEffect(() => {
    if (isLoggedIn && userData?.isAccountVerified) {
      navigate('/buy');
    }
  }, [isLoggedIn, userData, navigate]);

  const handleInput = (e, index) => {
    e.target.value = e.target.value.replace(/[^0-9]/g, '');
    if (e.target.value && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    } else if (index === inputRefs.current.length - 1) {
      inputRefs.current[index].blur();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !e.target.value && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    const paste = e.clipboardData.getData('text').replace(/[^0-9]/g, '');
    paste.split('').forEach((char, i) => {
      if (inputRefs.current[i]) {
        inputRefs.current[i].value = char;
      }
    });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const otpArray = inputRefs.current.map((el) => el.value.trim());
    if (otpArray.includes('')) {
      toast.error('Please fill all fields');
      return;
    }

    const otp = otpArray.join('');

    try {
      const { data } = await axios.post(`${backendUrl}/api/auth/verify-account`, { otp });
      if (data.success) {
        toast.success(data.message);
        getUserData();
        navigate('/buy');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <div className='flex items-center justify-center min-h-screen px-6 bg-gradient-to-br'>
      <img
        src={assets.logo}
        alt='App Logo'
        className='absolute left-6 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer'
        onClick={() => navigate('/')}
      />

      <form
        className='bg-slate-900 p-8 rounded-2xl shadow-2xl w-full max-w-md text-sm'
        onSubmit={onSubmitHandler}
      >
        <h1 className='text-white text-2xl font-semibold text-center mb-3'>Verify Your Email</h1>
        <p className='text-indigo-300 text-center mb-6'>Enter the 6-digit code we sent to your email</p>

        <div
          className='flex justify-between gap-2 mb-8'
          onPaste={handlePaste}
        >
          {Array(6).fill(0).map((_, index) => (
            <input
              key={index}
              type='text'
              maxLength='1'
              required
              className='w-12 h-12 bg-[#2f3654] border border-transparent focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 text-white text-center text-xl rounded-lg transition-all duration-150'
              ref={(el) => (inputRefs.current[index] = el)}
              onInput={(e) => handleInput(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
            />
          ))}
        </div>

        <button
          type='submit'
          className='w-full py-3 bg-gradient-to-r from-indigo-500 to-indigo-800 hover:from-indigo-600 hover:to-indigo-900 rounded-full text-white font-semibold transition duration-300'
        
        >
          Verify Email
        </button>
      </form>
    </div>
  );
};

export default VerifyEmail;
