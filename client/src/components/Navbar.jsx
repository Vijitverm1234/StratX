import React, { useContext } from 'react';
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
    <div className="fixed top-0 w-full flex justify-between items-center px-6 sm:px-24 py-4 backdrop-blur-lg  z-50">
      {/* Logo */}
      <img
        src={assets.logo}
        alt="Logo"
        className="w-28 sm:w-32 cursor-pointer"
        onClick={() => navigate('/')}
      />

      {/* User Info or Login Button */}
      {userData ? (
        <div className="relative group">
          <div className="w-12 h-12 flex justify-center items-center rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold text-lg shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer">
            {userData?.name?.charAt(0).toUpperCase()}
          </div>

          {/* Dropdown */}
          <div className="absolute hidden group-hover:flex flex-col top-14 right-0 z-20 bg-white shadow-lg rounded-xl overflow-hidden transition-all duration-300 ease-in-out opacity-0 group-hover:opacity-100">
            <ul className="list-none m-0 p-2 text-sm text-gray-700 w-44">
              {!userData.isAccountVerified && (
                <li className="py-3 px-4 hover:bg-gray-100 cursor-pointer transition" onClick={sendVerificationOtp}>✅ Verify Email</li>
              )}
              <li className="py-3 px-4 hover:bg-gray-100 cursor-pointer transition" onClick={logout}>
                🚪 Log Out
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <button
          className="flex items-center gap-2 border border-gray-500 rounded-full px-6 py-2 text-gray-800 bg-white shadow-md hover:bg-gray-200 transition-all duration-300 ease-in-out"
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
