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
      const url = state === 'Sign Up' ? '/api/auth/register' : '/api/auth/login';
      const payload = state === 'Sign Up' ? { name, email, password } : { email, password };
      const { data } = await axios.post(`${backendUrl}${url}`, payload, { withCredentials: true });

      if (data.success) {
        await getUserData();
        setIsLoggedin(true);
        navigate('/');
      } else {
        toast.error(data.message || 'Authentication failed.');
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
        <h2 className='text-3xl font-semibold text-white text-center mb-3'>
          {state === 'Sign Up' ? 'Create Account' : 'Login'}
        </h2>
        <p className='text-sm mb-3 text-center'>
          {state === 'Sign Up' ? 'Create Your Account' : 'Login to Your Account'}
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
            className='mb-4 text-indigo-500 cursor-pointer text-center'
            onClick={() => navigate('/reset-password')}
          >
            Forgot password?
          </p>

          <button
            type='submit'
            disabled={loading}
            className={`w-full py-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-900 text-white font-semibold transition duration-300 ${
              loading ? 'opacity-50 cursor-not-allowed' : 'hover:from-indigo-600 hover:to-indigo-950'
            }`}
          >
            {loading ? 'Processing...' : state === 'Sign Up' ? 'Create Account' : 'Login'}
          </button>
        </form>

        <p className='mt-3 text-gray-400 text-center'>
          {state === 'Sign Up'
            ? 'Already have an account? '
            : "Don't have an account? "}
          <span
            className='text-blue-400 cursor-pointer underline'
            onClick={() => setState(state === 'Sign Up' ? 'Login' : 'Sign Up')}
          >
            {state === 'Sign Up' ? 'Login Here' : 'Sign Up Here'}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
