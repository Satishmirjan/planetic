import React, { useState, useEffect } from 'react';
import { FiStar, FiMapPin, FiClock, FiDollarSign } from 'react-icons/fi';
import { getPlaceDetails, PHOTO_REF_URL } from '../../service/GlobalApi';

function PlaceCardItem({ place }) {
  const [photoUrl, setPhotoUrl] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlacePhoto = async () => {
      try {
        const data = { textQuery: place?.name };
        const result = await getPlaceDetails(data);
        const photo = result?.data?.places?.[0]?.photos?.[0];
        
        if (photo?.name) {
          const url = PHOTO_REF_URL.replace("{NAME}", photo.name);
          setPhotoUrl(url);
        }
      } catch (error) {
        console.error("Error fetching place photo:", error);
      } finally {
        setLoading(false);
      }
    };

    if (place) fetchPlacePhoto();
  }, [place]);

  return (
    <div className="group relative bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 border-orange-100 hover:border-[#f56551]">
      {/* Image Container */}
      <div className="relative h-48 overflow-hidden">
        {loading ? (
          <div className="animate-pulse bg-gradient-to-r from-orange-50 to-amber-100 w-full h-full" />
        ) : (
          <img
            src={photoUrl || '/placeholder-image.jpg'}
            alt={place?.name}
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              e.target.src = '/placeholder-image.jpg';
            }}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        
        {/* Rating Badge */}
        <div className="absolute top-4 right-4 bg-white/90 px-3 py-1 rounded-full flex items-center gap-1">
          <FiStar className="text-[#f56551]" />
          <span className="font-medium text-gray-800">
            {place?.rating || '4.5'}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        <h3 className="text-xl font-bold bg-gradient-to-r from-[#f56551] to-[#ff922b] bg-clip-text text-transparent">
          {place?.name}
        </h3>
        
        <p className="text-gray-600 line-clamp-2">{place?.description}</p>
        
        {/* Details Grid */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <FiMapPin className="text-[#f56551]" />
            <span className="text-gray-600 truncate">{place?.vicinity}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <FiClock className="text-[#f56551]" />
            <span className="text-gray-600">{place?.opening_hours?.open_now ? 'Open Now' : 'Closed'}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <FiDollarSign className="text-[#f56551]" />
            <span className="text-gray-600">
              {place?.price_level || '$$'} Price Level
            </span>
          </div>
        </div>

        {/* CTA Button */}
        <button className="w-full mt-4 flex items-center justify-center gap-2 bg-gradient-to-r from-[#f56551] to-[#ff922b] text-white py-3 rounded-xl font-medium hover:opacity-90 transition-opacity">
          View Details
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
        </button>
      </div>
    </div>
  );
}

export default PlaceCardItem;