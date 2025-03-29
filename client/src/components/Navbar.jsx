import React, { useContext } from 'react';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import { AppContent } from '../Context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Navbar = () => {
  const navigate = useNavigate();
  const { userData, backendUrl, setUserData, setIsLoggedin } = useContext(AppContent);
  const logout=async()=>{
   try {
    axios.defaults.withCredentials=true
    const {data}=await axios.post(backendUrl+'/api/auth/logout')
    data.success && setIsLoggedin(false)
    data.success && setUserData(false)
    navigate('/') 
   } catch (error) {
    toast.error(error.message)
   }
  }
  return (
    <div className="w-full flex justify-between items-center p-4 sm:p-6 sm:px-24 absolute top-0">
      <img src={assets.logo} alt="Logo" className="w-28 sm:w-32" />
      {userData ? (
        <div className="relative group">
        <div className="w-12 h-12 flex justify-center items-center rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold text-lg shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer">
          {userData?.name?.charAt(0).toUpperCase()}
        </div>
      
        {/* Dropdown */}
        <div className="absolute hidden group-hover:flex flex-col top-14 right-0 z-10 bg-white shadow-lg rounded-lg overflow-hidden transition-all duration-200">
          <ul className="list-none m-0 p-2 text-sm text-gray-700 w-40">
            {
             !userData.isAccountVerified &&  <li className="py-2 px-3 hover:bg-gray-100 cursor-pointer transition">✅ Verify Email</li>
            }
           
            <li className="py-2 px-3 hover:bg-gray-100 cursor-pointer transition" onClick={logout}>🚪 Log Out</li>
          </ul>
        </div>
      </div>
      

      ) : (
        <button
          className="flex items-center gap-2 border border-gray-500 rounded-full px-6 py-2 text-gray-800 hover:bg-gray-100 transition-all"
          onClick={() => navigate('/login')}
        >
          Login
          <img src={assets.arrow_icon} alt="Arrow" />
        </button>
      )}
    </div>
  );
};

export default Navbar;
