import React from 'react';
import { assets } from '../assets1/assets';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-28 px-6 py-12 text-sm text-gray-600">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-12">

      
        <div className="flex-1">
          <img src={assets.weblogo} width={150} alt="Imagify Logo" className="mb-4" />
          <p className="max-w-xs text-gray-500">
            Transform your imagination into stunning visuals using our AI-powered image generator.
          </p>
          <p className="text-xs mt-4 text-gray-400">
            &copy; {new Date().getFullYear()} Vijit Verma. All rights reserved.
          </p>
        </div>


        <div className="flex flex-col gap-2 min-w-[150px]">
          <h3 className="font-semibold text-gray-800 mb-2">Quick Links</h3>
          <Link to="/" className="hover:text-black transition">Home</Link>
          <Link to="/result" className="hover:text-black transition">Generate</Link>
          <Link to="/buy" className="hover:text-black transition">Pricing</Link>
          <Link to="/blog" className="hover:text-black transition">Blog</Link>
        </div>

   
        <div className="flex flex-col gap-2 min-w-[150px]">
          <h3 className="font-semibold text-gray-800 mb-2">Support</h3>
          <Link to="/faq" className="hover:text-black transition">FAQs</Link>
          <Link to="/contact" className="hover:text-black transition">Contact Us</Link>
          <Link to="/terms" className="hover:text-black transition">Terms & Conditions</Link>
          <Link to="/privacy" className="hover:text-black transition">Privacy Policy</Link>
        </div>

        <div className="flex flex-col">
          <h3 className="font-semibold text-gray-800 mb-3">Follow Us</h3>
          <div className="flex gap-4">
            
            <a href="https://instagram.com" target="_blank" rel="noreferrer">
              <img src={assets.instagram_icon} alt="Instagram" className="w-7 hover:scale-110 transition-all duration-300" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer">
              <img src={assets.twitter_icon} alt="Twitter" className="w-7 hover:scale-110 transition-all duration-300" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
