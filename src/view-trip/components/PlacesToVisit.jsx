import React, { useState, useEffect } from 'react';
import { getPlaceDetails, PHOTO_REF_URL } from '../../service/GlobalApi';
import { FiClock, FiDollarSign, FiMapPin, FiSunrise } from 'react-icons/fi';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

function PlacesToVisit({ trip }) {
  const sortedDays = trip?.TripData?.itinerary
    ? Object.entries(trip.TripData.itinerary).sort((a, b) => {
        const dayA = parseInt(a[0].split(' ')[1], 10);
        const dayB = parseInt(b[0].split(' ')[1], 10);
        return dayA - dayB;
      })
    : [];

  return (
    <div className="bg-white rounded-3xl shadow-xl p-8 border-2 border-orange-100">
      <h2 className="text-3xl font-bold bg-gradient-to-r from-[#f56551] to-[#ff922b] bg-clip-text text-transparent mb-8">
        🌟 Daily Itinerary
      </h2>

      <div className="space-y-10">
        {sortedDays.map(([day, places], dayIndex) => (
          <div key={dayIndex} className="group">
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-[#f56551] text-white w-12 h-12 rounded-xl flex items-center justify-center text-xl font-bold">
                {dayIndex + 1}
              </div>
              <h2 className="text-2xl font-bold text-gray-800">{day.toUpperCase()}</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {places.map((place, index) => (
                <PlaceCard key={index} place={place} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PlaceCard({ place }) {
  const [photoUrl, setPhotoUrl] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPhoto = async () => {
      try {
        const data = { textQuery: place.placeName };
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

    if (place) fetchPhoto();
  }, [place]);

  return (
    <a
      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        place.placeName + ' ' + place.placeDetails
      )}`}
      target="_blank"
      rel="noopener noreferrer"
      className="block bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border-2 border-orange-100 hover:border-[#f56551] group"
    >
      {/* Image Container */}
      <div className="relative h-48 overflow-hidden">
        {loading ? (
          <div className="absolute inset-0 bg-gradient-to-r from-orange-50 to-amber-100 animate-pulse" />
        ) : (
          <img
            src={photoUrl || '/placeholder.jpg'}
            alt={`Image of ${place.placeName}`}
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
            onError={(e) => {
              e.target.src = '/placeholder.jpg';
            }}
          />
        )}
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        <h2 className="text-xl font-bold bg-gradient-to-r from-[#f56551] to-[#ff922b] bg-clip-text text-transparent">
          {place.placeName}
        </h2>
        
        <p className="text-gray-600 line-clamp-2">{place.placeDetails}</p>

        {/* Details Grid */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <FiSunrise className="text-[#f56551] flex-shrink-0" />
            <span className="text-gray-600 truncate">{place.bestTimeToVisit}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <FiClock className="text-[#f56551] flex-shrink-0" />
            <span className="text-gray-600">{place.timeToSpend}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <FiDollarSign className="text-[#f56551] flex-shrink-0" />
            <span className="text-gray-600">{place.ticketPricing || 'Free'}</span>
          </div>
        </div>

        {/* CTA */}
        <div className="flex items-center gap-2 text-[#f56551] font-medium mt-4">
          <span>View on Maps</span>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-5 w-5 transition-transform group-hover:translate-x-1"
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </div>
      </div>
    </a>
  );
}

export default PlacesToVisit;