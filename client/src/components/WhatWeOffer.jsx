import React from 'react';
import { motion } from 'framer-motion';
import { assets } from '../assets/assets'; 
import { useNavigate } from 'react-router-dom';

const WhatWeOffer = () => {
  const navigate = useNavigate();

  // Card data
  const services = [
    {
      title: 'Healthcare Consultancy',
      description: 'Expert guidance from certified professionals to optimize your health and wellness journey.',
      logo: assets.healthcare_icon, 
      link: '/healthcare-consultancy', 
    },
    {
      title: 'AI-based Suggestions',
      description: 'Personalized health recommendations powered by advanced artificial intelligence.',
      logo: assets.ai_icon, 
      link: '/ai-suggestions', 
    },
    {
      title: 'Best Offers',
      description: 'Exclusive deals for fresh and packages tailored to your healthcare needs.',
      logo: assets.offers_icon,
      link: '/best-offers', 
    },
  ];

  // Animation variants for cards
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.6,
        ease: 'easeOut',
      },
    }),
    hover: {
      scale: 1.05,
      boxShadow: '0px 10px 30px rgba(0, 0, 255, 0.1)',
      transition: {
        duration: 0.3,
      },
    },
  };

  // Animation for buttons
  const buttonVariants = {
    hover: {
      scale: 1.1,
      backgroundColor: '#1e40af',
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <section className="bg-white py-16 px-6">
      <div className="max-w-7xl mx-auto text-center">
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-blue-900 mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          What We Offer
        </motion.h2>
        <motion.p
          className="text-lg text-blue-600 mb-12 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Discover our premium services designed to enhance your healthcare experience with cutting-edge technology and expert care.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              className="bg-white rounded-xl p-6 text-center shadow-lg border border-blue-100"
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              custom={index}
            >
              <div className="mb-4">
               
              </div>
              <h3 className="text-xl font-semibold text-blue-900 mb-2">{service.title}</h3>
              <p className="text-blue-700 mb-4">{service.description}</p>
             
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatWeOffer;