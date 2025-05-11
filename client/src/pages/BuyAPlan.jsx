import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { motion } from 'framer-motion';

import { CheckCircle2 } from 'lucide-react';

const BuyAPlan = () => {
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => setRazorpayLoaded(true);
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const plans = [
    {
      id: 'Basic',
      price: 5,
      desc: 'Ideal for individuals getting started.',
      features: ['Video Meetings', 'Basic Analytics'],
    },
    {
      id: 'Advanced',
      price: 10,
      desc: 'Perfect for small teams or startups.',
      features: ['Video Meetings', 'Simulations', 'Priority Support', 'Advanced Analytics'],
    },
    {
      id: 'Business',
      price: 10,
      desc: 'Built for large teams and enterprises.',
      features: [
        'Video Meetings',
        'Simulations',
        'Priority Support',
        'Advanced Analytics',
        'Custom Reports',
        'Dedicated Manager',
      ],
    },
  ];

  const handlePayment = async (plan) => {
    if (!razorpayLoaded) {
      alert('Razorpay script is still loading. Please try again later.');
      return;
    }

    try {
      const response = await fetch('http://localhost:4000/api/payment/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount: plan.price }),
      });

      const data = await response.json();

      if (response.ok) {
        const options = {
          key: import.meta.env.VITE_RAZORPAY_KEY_ID,
          amount: data.amount,
          currency: 'INR',
          order_id: data.id,
          name: 'Your App Name',
          description: 'Payment for plan',
          handler: function (response) {
            alert('Payment successful');
          },
          prefill: {
            name: 'Your Name',
            email: 'your_email@example.com',
            contact: '9876543210',
          },
        };

        if (window.Razorpay) {
          const rzp = new window.Razorpay(options);
          rzp.open();
        } else {
          throw new Error('Razorpay object is not available.');
        }
      } else {
        throw new Error('Payment initiation failed');
      }
    } catch (error) {
      console.error('Payment initiation failed:', error);
      alert('Payment initiation failed');
    }
  };


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
    <>
     <Navbar />
    <div className="bg-white ">
     
      <div className="py-16  lg:px-8 mt-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-blue-600 text-sm uppercase tracking-wider mb-3">Our Plans</h2>
          <h1 className="text-4xl md:text-5xl font-bold text-blue-900">Choose the Right Plan for You</h1>
        </motion.div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((item, index) => (
            <motion.div
              key={item.id}
              className="bg-white border border-blue-100 rounded-2xl shadow-lg p-8 text-left flex flex-col"
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              custom={index}
            >
              <div className="flex items-center gap-3 mb-4">
             
                <h3 className="text-2xl font-semibold text-blue-900">{item.id}</h3>
              </div>
              <p className="text-blue-700 mb-6">{item.desc}</p>
              <ul className="space-y-3 mb-6 flex-grow">
                {item.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-blue-800 text-sm">
                    <CheckCircle2 className="text-green-600" size={18} />
                    {feature}
                  </li>
                ))}
              </ul>
              <p className="text-3xl font-bold text-blue-900 mb-6">₹{item.price}</p>
              <motion.button
                onClick={() => handlePayment(item)}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-800 text-white text-sm py-3 rounded-lg font-semibold"
                variants={buttonVariants}
                whileHover="hover"
              >
                Purchase
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
    </>
  );
};

export default BuyAPlan;