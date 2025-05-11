import React from 'react';
import { assets } from '../assets/assets';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <div id="about" className="flex flex-col items-center justify-center container mx-auto p-14 md:px-20 lg:px-32 w-full overflow-hidden">
      
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="text-2xl sm:text-4xl font-bold mb-2"
      >
        About <span className="underline underline-offset-4 decoration-1 font-light">Our Consultancy</span>
      </motion.h1>
      
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="text-gray max-w-80 text-center mb-8"
      >
        Welcome to MedVision — where care meets expertise. 🩺
      </motion.p>

      <div className="flex flex-col md:flex-row items-center md:items-start md:gap-20">
        <motion.img
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          src={assets.main1}
          className="w-full sm:w-1/2 max-w-lg"
          alt="Medical Consultancy"
        />

        <div className="flex flex-col items-center md:items-start mt-10 text-gray-600">
          <div className="grid grid-cols-2 gap-6 md:gap-10 w-full">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <p className="font-medium text-4xl text-gray-600">10+</p>
              <p>Years of Trusted Healthcare</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <p className="font-medium text-4xl text-gray-600">5000+</p>
              <p>Patients Guided</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.8 }}
            >
              <p className="font-medium text-4xl text-gray-600">100+</p>
              <p>Partnered Specialists</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              <p className="font-medium text-4xl text-gray-600">24/7</p>
              <p>Consultation Support</p>
            </motion.div>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="my-10 max-w-lg"
          >
            At MedVision, we empower individuals with timely, expert medical advice. Our mission is to bridge the gap between patients and quality healthcare by offering personalized consultancy, reliable second opinions, and continuous health monitoring support.
          </motion.p>
        </div>
      </div>
    </div>
  );
};

export default About;
