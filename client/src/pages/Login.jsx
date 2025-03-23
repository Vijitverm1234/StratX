import React, { useState } from 'react'
import { assets } from '../assets/assets';

const Login = () => {
  const [state,setState]=useState('Sign Up');
  return (
    <div className=' flex items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-br from-blue-200 to-purple-400'>
      <img src={assets.logo} alt="" className='absolute left-5 sm:left-20 top-5 w-28 sm-w-32 cursor-pointer'/>
      <div className='bg-slate-900 p-10 rounded-lg shadow-lg w-full sm:w-96 text-indigo-200  text-sm'>
        <h2 className='text-3xl font-semibold text-white text-center mb-3'>
          {state=='Sign Up'?'Create Account':'Login '}
        </h2>
        <p className='text-sm mb-3 text-center'>
        {state=='Sign Up'?'Create Your account':'Login To Your Account'}
        </p>
        <form>
          <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333a5c]'>
            <img src={assets.person_icon}  alt="" />
            <input type="text"  placeholder='Your Name' required className='outline-none bg-transparent text-white'/>
          </div>
          <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333a5c]'>
            <img src={assets.mail_icon}  alt="" />
            <input type="email"  placeholder='Your Email' required className='outline-none bg-transparent text-white'/>
          </div>
          <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333a5c]'>
            <img src={assets.lock_icon}  alt="" />
            <input type="password"  placeholder='Your Password' required className='outline-none bg-transparent text-white'/>
          </div>
           <p className='mb-4 text-indigo-500 cursor-pointer'>
          Forgot password ?
        </p>
        <button className='w-full py-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-900 cursor-pointer '>{state==='Sign Up'?'Create Account':'Login in'}</button>
        </form>

        {state=='Sign Up'?
        <p className='mt-2.5 text-gray-400 text-center text-s'>
        Already Have an Account ? {' '} <span className='text-blue-400 cursor-pointer underline'>Login Here</span>
      </p>
        :
        <p className='mt-2.5 text-gray-400 text-center text-s'>
        Don't have an Account ? {' '} <span className='text-blue-400 cursor-pointer underline'>Sign up Here</span>
      </p>
        }
          

        
        </div>
    </div>
  )
}

export default Login
