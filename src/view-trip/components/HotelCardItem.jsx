import React, { useState, useEffect } from 'react';
import { getPlaceDetails, PHOTO_REF_URL } from '../../service/GlobalApi';
import { FiMapPin, FiStar, FiDollarSign } from 'react-icons/fi';

function HotelCardItem({ hotel }) {
  const googleMapsSearchUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${hotel?.hotelName} ${hotel?.hotelAddress}`
  )}`;

  const [photoUrl, setPhotoUrl] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (hotel) {
      GetPlacePhoto();
    }
  }, [hotel]);

  const GetPlacePhoto = async () => {
    try {
      const data = { textQuery: hotel?.hotelName };
      const res = await getPlaceDetails(data);
      
      if(res.data.places[0]?.photos[3]?.name) {
        const PhotoUrl = PHOTO_REF_URL.replace('{NAME}', res.data.places[0].photos[3].name);
        setPhotoUrl(PhotoUrl);
      }
    } catch (error) {
      console.error("Error fetching hotel photo:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="group relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border-2 border-orange-100 hover:border-[#f56551]">
      <a 
        href={googleMapsSearchUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="block"
      >
        {/* Image Container */}
        <div className="relative h-48 overflow-hidden">
          {photoUrl ? (
            <img 
              src={photoUrl} 
              alt={`Hotel ${hotel?.hotelName}`} 
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-r from-orange-50 to-amber-50">
              <div className="animate-pulse text-gray-400">
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <h3 className="text-xl font-bold bg-gradient-to-r from-[#f56551] to-[#ff922b] bg-clip-text text-transparent">
            {hotel?.hotelName}
          </h3>

          <div className="flex items-center gap-2 text-gray-600">
            <FiMapPin className="flex-shrink-0" />
            <p className="text-sm truncate">{hotel?.hotelAddress}</p>
          </div>

          <div className="flex gap-4">
            <div className="flex items-center gap-1 bg-orange-50 px-3 py-1 rounded-full">
              <FiStar className="text-[#f56551]" />
              <span className="text-sm font-medium text-[#f56551]">
                {hotel?.rating} / 5
              </span>
            </div>

            <div className="flex items-center gap-1 bg-orange-50 px-3 py-1 rounded-full">
              <FiDollarSign className="text-[#f56551]" />
              <span className="text-sm font-medium text-[#f56551]">
                {hotel?.price || 'N/A'}
              </span>
            </div>
          </div>

          <div className="mt-4 flex items-center gap-2 text-[#f56551] font-semibold hover:text-[#e55341] transition-colors">
            <span>Explore Location</span>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5"
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M17 8l4 4m0 0l-4 4m4-4H3" 
              />
            </svg>
          </div>
        </div>
      </a>
    </div>
  );
}

export default HotelCardItem;