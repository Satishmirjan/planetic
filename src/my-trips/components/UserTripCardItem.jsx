import React, { useEffect, useState } from 'react';
import { getPlaceDetails, PHOTO_REF_URL } from '../../service/GlobalApi';
import { Link } from 'react-router-dom';

function UserTripsCardItem({ trip }) {
  const [photoUrl, setPhotoUrl] = useState();

  useEffect(() => {
    if (trip) {
      GetPlacePhoto();
    }
  }, [trip]);

  const GetPlacePhoto = async () => {
    const data = {
      textQuery: trip?.userSelection?.location?.label,
    };

    try {
      const resp = await getPlaceDetails(data);
      const photo = resp?.data?.places?.[0]?.photos?.[3];

      if (photo?.name) {
        const PhotoUrl = PHOTO_REF_URL.replace("{NAME}", photo.name);
        setPhotoUrl(PhotoUrl);
      }
    } catch (error) {
      console.error("Failed to fetch place photo", error);
    }
  };

  return (
    <Link to={'/view-trip/'+trip?.id} className="group">
      <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden hover:-translate-y-2 border border-orange-100">
        {/* Image Container */}
        <div className="relative h-48 bg-gray-100 overflow-hidden">
          {photoUrl ? (
            <img 
              src={photoUrl} 
              alt="Trip location" 
              className="w-full h-full object-cover transform group-hover:scale-105 transition-all duration-300"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-r from-orange-50 to-amber-50">
              <div className="animate-pulse text-gray-400">
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
          )}
          <div className="absolute bottom-2 right-2 bg-white px-3 py-1 rounded-full text-sm font-medium text-[#f56551] shadow-sm">
            {trip?.userSelection?.noOfDays} days
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <h2 className="font-bold text-xl mb-1 bg-gradient-to-r from-[#f56551] to-[#ff922b] bg-clip-text text-transparent">
            {trip?.userSelection?.location?.label}
          </h2>
          <p className="text-gray-500 text-sm">
            {new Date(trip?.id).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default UserTripsCardItem;