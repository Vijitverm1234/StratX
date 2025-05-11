import React, { useContext, useState } from 'react';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import { AppContent } from '../Context/AppContext';
import { toast } from 'react-toastify';
import axios from 'axios';

const DoctorLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [showOtpField, setShowOtpField] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { backendUrl, setIsLoggedin, getUserData } = useContext(AppContent);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!showOtpField) {
        
        const url = '/api/auth/login';
        const payload = { email, password };
        const { data } = await axios.post(`${backendUrl}${url}`, payload, { withCredentials: true });

        if (data.success && data.otpRequired) {
      
          toast.success('OTP sent to your email.');
          setShowOtpField(true);
        } else if (data.success) {
    
          await getUserData();
          setIsLoggedin(true);
          navigate('/');
        } else {
          toast.error(data.message || 'Authentication failed.');
        }
      } else {
      
        const url = '/api/auth/verify-otp';
        const payload = { email, otp };
        const { data } = await axios.post(`${backendUrl}${url}`, payload, { withCredentials: true });

        if (data.success) {
          await getUserData();
          setIsLoggedin(true);
          navigate('/');
        } else {
          toast.error(data.message || 'Invalid OTP.');
        }
      }
    } catch (error) {
      console.error("Auth Error:", error);

      const status = error.response?.status;
      const message =
        error.response?.data?.message ||
        (status === 401 && 'Incorrect password.') ||
        (status === 404 && 'User not found.') ||
        'Something went wrong. Please try again.';

      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-br'>
      <img
        src={assets.logo}
        alt='App Logo'
        className='absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer'
        onClick={() => navigate('/')}
      />
      <div className='bg-slate-900 p-10 rounded-lg shadow-lg w-full sm:w-96 text-indigo-200 text-sm'>
        <h2 className='text-3xl font-semibold text-white text-center mb-3'>Doctor Login</h2>
        <p className='text-sm mb-3 text-center'>
          {showOtpField ? 'Enter OTP sent to your email' : 'Login to Your Doctor Account'}
        </p>
        <form onSubmit={onSubmitHandler}>
          {!showOtpField ? (
            <>
              <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333a5c]'>
                <img src={assets.mail_icon} alt='Email Icon' />
                <input
                  type='email'
                  placeholder='Your Email'
                  required
                  className='outline-none bg-transparent text-white'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333a5c]'>
                <img src={assets.lock_icon} alt='Lock Icon' />
                <input
                  type='password'
                  placeholder='Your Password'
                  required
                  className='outline-none bg-transparent text-white'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <p
                className='mb-4 text-indigo-500 cursor-pointer text-center'
                onClick={() => navigate('/reset-password')}
              >
                Forgot password?
              </p>
            </>
          ) : (
            <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333a5c]'>
              <img src={assets.lock_icon} alt='OTP Icon' />
              <input
                type='text'
                placeholder='Enter OTP'
                required
                className='outline-none bg-transparent text-white'
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
            </div>
          )}

          <button
            type='submit'
            disabled={loading}
            className={`w-full py-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-900 text-white font-semibold transition duration-300 ${
              loading ? 'opacity-50 cursor-not-allowed' : 'hover:from-indigo-600 hover:to-indigo-950'
            }`}
          >
            {loading ? 'Processing...' : showOtpField ? 'Verify OTP' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default DoctorLogin;