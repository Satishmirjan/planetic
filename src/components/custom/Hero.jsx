import React from 'react';
import { Button } from '../ui/button';
import { Link } from 'react-router-dom';

function Hero() {
  return (
    <div className="relative overflow-hidden" style={{ background: 'radial-gradient(ellipse at center, #FED7D5 0%, #FB923C 100%)' }}>
      <div className='flex flex-col md:flex-row items-center justify-between mx-6 md:mx-24 lg:mx-40 pt-16 pb-24 gap-10'>
        <div className='flex-1 text-center md:text-left'>
          <h1 className='font-extrabold text-[36px] md:text-[52px] lg:text-[60px] leading-tight mb-6 text-white'>
            <span className='bg-gradient-to-r from-[#FF6B6B] to-[#FF922B] text-transparent bg-clip-text'>
              Your Perfect Trip, Planned by AI –
            </span><br />
            Effortless, Smart, and Personalized!
          </h1>
          <p className='text-lg text-white/80 mb-8 max-w-xl mx-auto md:mx-0'>
            Our AI-powered trip planner customizes your itinerary based on your interests, budget, and schedule — making travel planning seamless and stress-free!
          </p>
          <Link to="/trip">
            <Button className="bg-white hover:bg-gray-100 text-[#f56551] px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-all duration-300">
              Get Started
            </Button>
          </Link>
        </div>

        <div className='flex-1'>
          <img 
            src="/landing.png" 
            alt="AI Trip Planner" 
            className="w-full max-w-2xl mx-auto md:mx-0 shadow-2xl transform rotate-3 translate-y-10 hover:rotate-2 transition-transform duration-300" 
          />
        </div>
      </div>

      {/* Curved bottom divider */}
      <div className="absolute bottom-0 left-0 w-full">
        <svg 
          viewBox="0 0 1440 100" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg" 
          className="w-full h-24"
        >
          <path 
            d="M0 50C0 50 360 0 720 0C1080 0 1440 50 1440 50V100H0V50Z" 
            fill="white" 
          />
        </svg>
      </div>
    </div>
  );
}

export default Hero;