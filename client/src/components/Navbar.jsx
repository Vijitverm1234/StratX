import React, { useContext, useEffect } from 'react';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import { AppContent } from '../Context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Navbar = () => {
  const navigate = useNavigate();
  const { userData, backendUrl, setUserData, setIsLoggedin } = useContext(AppContent);
   const sendVerificationOtp=async()=>{
    try {
      axios.defaults.withCredentials=true;
      const {data}=await axios.post(backendUrl+'/api/auth/send-verify-otp')
      if(data.success){
        navigate('/email-verify')
        toast.success(data.message)
      } 
      else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
   }
  const logout = async () => {
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(`${backendUrl}/api/auth/logout`);
      if (data.success) {
        setIsLoggedin(false);
        setUserData(null);
        navigate('/');
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
    
  
  return (
    <div className="fixed top-0 w-full flex justify-between items-center px-6 sm:px-24 py-4 backdrop-blur-md bg-white/80  border-gray-200 dark:border-slate-700 z-50">

  <img
    src={assets.weblogo}
    alt="Logo"
    className="w-28 sm:w-32 cursor-pointer"
    onClick={() => navigate('/')}
  />

  {userData ? (
    <div className="relative group">

      <div className="flex items-center space-x-2 cursor-pointer">
        <div className="w-11 h-11 flex items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-700 gray-white text-lg font-bold shadow-md transition-transform duration-300 group-hover:scale-105">
          {userData?.name?.charAt(0).toUpperCase()}
        </div>
        <span className="text-gray-700 dark:text-gray-600 hidden sm:inline font-medium">
          {userData?.name?.split(' ')[0]}
        </span>
      </div>


      <div className="absolute right-0 mt-3 w-48 bg-white dark:bg-slate-800 rounded-xl shadow-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 ease-in-out z-50">
        {!userData.isAccountVerified && (
          <div
            className="px-4 py-3 text-sm text-blue-600 dark:text-blue-400 hover:bg-gray-100 dark:hover:bg-slate-700 cursor-pointer transition"
            onClick={sendVerificationOtp}
          >
            ✅ Verify Email
          </div>
        )}
        <div
          className="px-4 py-3 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-slate-700 cursor-pointer transition"
          onClick={logout}
        >
          🚪 Log Out
        </div>
      </div>
    </div>
  ) : (
    <button
      className="flex items-center gap-2 border border-gray-700 dark:border-gray-600 rounded-full px-5 py-2 bg-white  text-gray-800  shadow hover:bg-gray-100 hover:text-white dark:hover:bg-slate-600 transition duration-300"
      onClick={() => navigate('/login')}
    >
      Login
      <img src={assets.arrow_icon} alt="Arrow" className="w-4" />
    </button>
  )}
</div>

  );
};

export default Navbar;
