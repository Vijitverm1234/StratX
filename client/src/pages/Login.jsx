import React, { useContext, useState } from 'react';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import { AppContent } from '../Context/AppContext';
import { toast } from 'react-toastify';
import axios from 'axios';

const Login = () => {
  const [state, setState] = useState('Sign Up');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  const { backendUrl, setIsLoggedin, getUserData } = useContext(AppContent);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      let data;
      if (state === 'Sign Up') {
        const response = await axios.post(
          `${backendUrl}/api/auth/register`, 
          { name, email, password }, 
          { withCredentials: true }
        );
        data = response.data;
      } else {
        const response = await axios.post(
          `${backendUrl}/api/auth/login`, 
          { email, password }, 
          { withCredentials: true }
        );
        data = response.data;
      }
      
      if (data.success) {
        await getUserData(); // Fetch user data before setting login state
        setIsLoggedin(true);
        navigate('/');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Login/Register Error:", error);
      toast.error(error.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-br from-blue-200 to-purple-400'>
      <img 
        src={assets.logo} 
        alt='App Logo' 
        className='absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer' 
        onClick={() => navigate('/')} 
      />
      <div className='bg-slate-900 p-10 rounded-lg shadow-lg w-full sm:w-96 text-indigo-200 text-sm'>
        <h2 className='text-3xl font-semibold text-white text-center mb-3'>
          {state === 'Sign Up' ? 'Create Account' : 'Login'}
        </h2>
        <p className='text-sm mb-3 text-center'>
          {state === 'Sign Up' ? 'Create Your Account' : 'Login To Your Account'}
        </p>
        <form onSubmit={onSubmitHandler}>
          {state === 'Sign Up' && (
            <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333a5c]'>
              <img src={assets.person_icon} alt='User Icon' />
              <input 
                type='text' 
                placeholder='Your Name' 
                required 
                className='outline-none bg-transparent text-white' 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
              />
            </div>
          )}
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
            className='mb-4 text-indigo-500 cursor-pointer' 
            onClick={() => navigate('/reset-password')}
          >
            Forgot password?
          </p>
          <button 
            type='submit' 
            disabled={loading} 
            className={`w-full py-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-900 cursor-pointer ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {loading ? 'Processing...' : state === 'Sign Up' ? 'Create Account' : 'Login'}
          </button>
        </form>
        {state === 'Sign Up' ? (
          <p className='mt-2.5 text-gray-400 text-center text-s'>
            Already Have an Account?{' '}
            <span 
              className='text-blue-400 cursor-pointer underline' 
              onClick={() => setState('Login')}
            >
              Login Here
            </span>
          </p>
        ) : (
          <p className='mt-2.5 text-gray-400 text-center text-s'>
            Don't have an Account?{' '}
            <span 
              className='text-blue-400 cursor-pointer underline' 
              onClick={() => setState('Sign Up')}
            >
              Sign Up Here
            </span>
          </p>
        )}
      </div>
    </div>
  );
};

export default Login;
