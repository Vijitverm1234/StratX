import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { assets } from '../assets1/assets.js';
import { CheckCircle2 } from 'lucide-react';

const BuyAPlan = () => {
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);

  useEffect(() => {
   
    const script = document.createElement('script');
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => setRazorpayLoaded(true); 
    document.body.appendChild(script);

    return () => {
      // Cleanup script when component is unmounted
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
      features: ['Video Meetings', 'Simulations', 'Priority Support', 'Advanced Analytics', 'Custom Reports', 'Dedicated Manager'],
    },
  ];

  const handlePayment = async (plan) => {
    if (!razorpayLoaded) {
      alert("Razorpay script is still loading. Please try again later.");
      return;
    }

    try {
      const response = await fetch('http://localhost:4000/api/payment/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount: plan.price }), // Pass the price from the selected plan
      });

      const data = await response.json();

      if (response.ok) {
        const options = {
          key: import.meta.env.VITE_RAZORPAY_KEY_ID, // Use import.meta.env for Vite
          amount: data.amount, // Amount in paise
          currency: 'INR',
          order_id: data.id,
          name: 'Your App Name',
          description: 'Payment for plan',
          handler: function (response) {
            alert('Payment successful');
            // Send payment info to your backend for confirmation
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
          throw new Error("Razorpay object is not available.");
        }
      } else {
        throw new Error('Payment initiation failed');
      }
    } catch (error) {
      console.error('Payment initiation failed:', error);
      alert('Payment initiation failed');
    }
  };

  return (
    <div>
      <Navbar />
      <div className="min-h-[80vh] bg-gray-50 text-center pt-16 mt-6 px-4">
        <h2 className="text-gray-700 text-sm uppercase tracking-wider mb-3">Our Plans</h2>
        <h1 className="text-4xl font-bold text-gray-800 mb-10">Choose the Right Plan for You</h1>

        <div className="flex flex-wrap justify-center gap-8">
          {plans.map((item, index) => (
            <div key={index} className="bg-white border border-gray-200 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 max-w-sm w-full p-8 text-left">
              <div className="flex items-center gap-3 mb-4">
                <img src={assets.logo_icon} alt="plan logo" width={32} />
                <h3 className="text-xl font-semibold text-gray-700">{item.id}</h3>
              </div>
              <p className="text-gray-500 mb-6">{item.desc}</p>
              <ul className="space-y-2 mb-6">
                {item.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-gray-600 text-sm">
                    <CheckCircle2 className="text-green-600" size={18} />
                    {feature}
                  </li>
                ))}
              </ul>
              <p className="text-3xl font-bold text-gray-800 mb-4">₹{item.price}</p>
              <button onClick={() => handlePayment(item)} className="w-full bg-gray-800 hover:bg-gray-900 text-white text-sm py-2.5 rounded-lg transition duration-200">
                Purchase
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BuyAPlan;
