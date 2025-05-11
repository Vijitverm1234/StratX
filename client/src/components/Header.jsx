import React, { useContext } from 'react';
import { assets } from '../assets/assets';
import { AppContent } from '../Context/AppContext';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Header = () => {
  const { userData } = useContext(AppContent);
  const userName = userData?.name || 'there';
  const isVerify = userData?.isAccountVerified || false;
  const navigate = useNavigate();

  return (
    <>
      <div className="flex items-center justify-center min-h-screen px-6 sm:px-20 py-16 text-center relative bg-offwhite mt-16">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="max-w-5xl w-full"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-blue-800 mb-4 leading-tight"
          >
            Hi <span className="text-indigo-600">{userName}</span>,
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-3xl sm:text-5xl lg:text-6xl font-semibold text-gray-800 mb-6"
          >
            Welcome to <span className="text-blue-600">MedVision</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-md sm:text-lg text-gray-700 mb-8 max-w-3xl mx-auto sm:mx-0 leading-relaxed"
          >
            Empowering you with smarter healthcare solutions. Trust MedVision for AI-driven insights,
            personalized care, and seamless communication with healthcare professionals at your fingertips.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-8"
          >
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-lg font-semibold shadow-md transition-all duration-300 cursor-pointer"
              onClick={() => console.log('Get Started Clicked')}
            >
              🚀 Get Started
            </button>
            <button
              className="text-blue-700 hover:text-blue-900 font-medium text-lg underline-offset-4 transition-all duration-300 rounded-lg border-2 border-blue-700 px-6 py-3 cursor-pointer"
              onClick={() => navigate('/about')}
            >
              Learn More →
            </button>
          </motion.div>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="w-16 h-1 bg-blue-600 mx-auto my-8 rounded-lg origin-left"
          />

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="text-gray-600 text-sm sm:text-md mb-6"
          >
            Experience the future of healthcare with MedVision: a platform designed for your health and
            well-being.
          </motion.p>
        </motion.div>
      </div>

      {isVerify && (
        <div className="fixed bottom-6 right-6 z-50">
          <motion.button
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="bg-indigo-600 text-white px-5 py-2.5 rounded-lg shadow-lg hover:bg-indigo-700 transition-all duration-300"
            onClick={() => navigate('/middle')}
          >
            📊 Open Dashboard
          </motion.button>
        </div>
      )}
    </>
  );
};

export default Header;
