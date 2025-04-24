import React from 'react';
import HotelCardItem from './HotelCardItem';
import { AiOutlineHotel } from 'react-icons/ai';

function Hotels({ trip }) {
  return (
    <div className="relative overflow-hidden">
      {/* Decorative Header Section */}
      <div 
        className="bg-gradient-to-r from-[#f56551] to-[#ff922b] py-16"
        style={{
          clipPath: 'ellipse(100% 80% at 50% -20%)'
        }}
      >
        <div className="max-w-6xl mx-auto px-4 md:px-8 text-center">
          <div className="inline-block bg-white/20 p-5 rounded-2xl mb-6">
            <AiOutlineHotel className="h-14 w-14 text-white" />
          </div>
          <h2 className="text-4xl font-black text-white mb-4">
            {trip?.userSelection?.location?.label} Stays
          </h2>
          <p className="text-white/90 text-lg">
            Curated accommodations for your {trip?.userSelection?.noOfDays}-day adventure
          </p>
        </div>
      </div>

      {/* Hotels Grid */}
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-12 -mt-20">
        {trip?.TripData?.hotels?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {trip.TripData.hotels.map((hotel, index) => (
              <HotelCardItem key={index} hotel={hotel} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white/80 rounded-2xl shadow-lg">
            <div className="text-4xl mb-4">🏨</div>
            <h3 className="text-xl font-semibold text-gray-600">
              No hotel recommendations available
            </h3>
            <p className="text-gray-500 mt-2">
              We're working on finding the perfect stays for your trip
            </p>
          </div>
        )}
      </div>

      {/* Curved Bottom Divider */}
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

export default Hotels;