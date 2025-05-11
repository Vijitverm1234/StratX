import React, { useContext, useRef, useState, useEffect } from 'react';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import { AppContent } from '../Context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const ResetPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [newpass, setNewpass] = useState('');
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [isOtpSubmitted, setIsOtpSubmitted] = useState(false);
  const [otpValue, setOtpValue] = useState('');
  const { backendUrl } = useContext(AppContent);

  axios.defaults.withCredentials = true;
  const inputRefs = useRef([]);

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

  const onSubmitEmail = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${backendUrl}/api/auth/send-reset-otp`, { email });
      if (data.success) {
        toast.success("Email Sent");
        setIsEmailSent(true);
      } else {
        toast.error("Invalid Email");
      }
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    }
  };

  const onSubmitOtp = async (e) => {
    e.preventDefault();
    const otpStr = inputRefs.current.map(e => e.value).join('');
    setOtpValue(otpStr);
    setIsOtpSubmitted(true);
  };

  const onSubmitNewPassword = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${backendUrl}/api/auth/reset-password`, {
        email,
        otp: otpValue,
        newpass
      });
      if (data.success) {
        toast.success("Password updated");
        navigate('/login');
      } else {
        toast.error(data.message || "Invalid OTP or error updating password");
      }
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    }
  };

  useEffect(() => {
    if (!isEmailSent) {
      inputRefs.current.forEach((input) => {
        if (input) input.value = '';
      });
    }
  }, [isEmailSent]);

  return (
    <div className='flex items-center justify-center min-h-screen px-6 '>
      <img
        src={assets.logo}
        alt='App Logo'
        className='absolute left-6 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer'
        onClick={() => navigate('/')}
      />

      {/* Email Form */}
      {!isEmailSent && (
        <form onSubmit={onSubmitEmail} className='bg-slate-900 p-8 rounded-2xl shadow-2xl w-full max-w-md text-sm'>
          <h1 className='text-white text-2xl font-semibold text-center mb-3'>Reset Password</h1>
          <p className='text-indigo-300 text-center mb-6'>Enter the registered email</p>
          <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333a5c]'>
            <img src={assets.mail_icon} className='w-3 h-3' alt="" />
            <input
              type="email"
              placeholder='Email-Id'
              className='bg-transparent outline-none text-white'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button className='w-full py-2.5 bg-gradient-to-r from-indigo-500 to-indigo-300 text-white rounded-full mt-3'>Submit</button>
        </form>
      )}

      {/* OTP Form */}
      {!isOtpSubmitted && isEmailSent && (
        <form className='bg-slate-900 p-8 rounded-2xl shadow-2xl w-full max-w-md text-sm' onSubmit={onSubmitOtp}>
          <h1 className='text-white text-2xl font-semibold text-center mb-3'>Reset Your Password</h1>
          <p className='text-indigo-300 text-center mb-6'>Enter the 6-digit code we sent to your email</p>
          <div className='flex justify-between gap-2 mb-8' onPaste={handlePaste}>
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
          <button type='submit' className='w-full py-3 bg-gradient-to-r from-indigo-500 to-indigo-800 hover:from-indigo-600 hover:to-indigo-900 rounded-full text-white font-semibold transition duration-300'>Submit</button>
        </form>
      )}

      {/* New Password Form */}
      {isOtpSubmitted && isEmailSent && (
        <form className='bg-slate-900 p-8 rounded-2xl shadow-2xl w-full max-w-md text-sm' onSubmit={onSubmitNewPassword}>
          <h1 className='text-white text-2xl font-semibold text-center mb-3'>New Password</h1>
          <p className='text-indigo-300 text-center mb-6'>Enter the new password</p>
          <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333a5c]'>
            <img src={assets.lock_icon} className='w-3 h-3' alt="" />
            <input
              type="password"
              placeholder='New Password'
              className='bg-transparent outline-none text-white'
              value={newpass}
              onChange={(e) => setNewpass(e.target.value)}
              required
            />
          </div>
          <button className='w-full py-2.5 bg-gradient-to-r from-indigo-500 to-indigo-300 text-white rounded-full mt-3'>Submit</button>
        </form>
      )}
    </div>
  );
};

export default ResetPassword;
