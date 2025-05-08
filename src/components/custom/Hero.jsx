import React from 'react';
import { Button } from '../ui/button';
import { Link } from 'react-router-dom';

function Hero() {
  return (
    <div className="relative overflow-hidden w-full" style={{ background: 'radial-gradient(ellipse at center, #FED7D5 0%, #FB923C 100%)' }}>
      <div className='flex flex-col md:flex-row items-center justify-between px-4 sm:px-6 lg:px-8 py-16 md:py-24 gap-8 md:gap-10'>
        <div className='flex-1 text-center md:text-left max-w-2xl mx-auto md:mx-0'>
          <h1 className='font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight mb-6 text-white'>
            <span className='bg-gradient-to-r from-[#FF6B6B] to-[#FF922B] text-transparent bg-clip-text'>
              Your Perfect Trip, Planned by AI –
            </span><br />
            Effortless, Smart, and Personalized!
          </h1>
          <p className='text-base sm:text-lg text-white/80 mb-8'>
            Our AI-powered trip planner customizes your itinerary based on your interests, budget, and schedule — making travel planning seamless and stress-free!
          </p>
          <Link to="/trip">
            <Button className="bg-white hover:bg-gray-100 text-[#f56551] px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg shadow-lg hover:shadow-xl transition-all duration-300">
              Get Started
            </Button>
          </Link>
        </div>

        <div className='flex-1 w-full max-w-xl mx-auto md:mx-0'>
          <img 
            src="/landing.png" 
            alt="AI Trip Planner" 
            className="w-full h-auto object-contain shadow-2xl transform rotate-3 translate-y-10 hover:rotate-2 transition-transform duration-300" 
          />
        </div>
      </div>

      {/* Curved bottom divider */}
      <div className="absolute bottom-0 left-0 w-full">
        <svg 
          viewBox="0 0 1440 100" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg" 
          className="w-full h-16 sm:h-24"
          preserveAspectRatio="none"
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