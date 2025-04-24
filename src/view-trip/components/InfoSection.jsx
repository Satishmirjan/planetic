import React, { useState, useEffect } from "react";
import { IoIosSend } from "react-icons/io";
import { getPlaceDetails } from "../../service/GlobalApi";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const PHOTO_REF_URL = `https://places.googleapis.com/v1/{NAME}/media?maxHeightPx=600&maxWidthPx=600&key=${import.meta.env.VITE_GOOGLE_API}`;

function InfoSection({ trip }) {
  const [photoUrl, setPhotoUrl] = useState("");
  const [loading, setLoading] = useState(true);

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
      setLoading(true);
      const result = await getPlaceDetails(data);
      const photo = result?.data?.places?.[0]?.photos?.[3];

      if (photo?.name) {
        const PhotoUrl = PHOTO_REF_URL.replace("{NAME}", photo.name);
        setPhotoUrl(PhotoUrl);
      }
    } catch (error) {
      console.error("Error fetching place details:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative overflow-hidden rounded-3xl shadow-xl border-2 border-orange-100">
      {/* Image Section with Gradient Overlay */}
      <div className="relative h-96">
        {loading ? (
          <div className="absolute inset-0 bg-gradient-to-r from-orange-50 to-amber-100 animate-pulse" />
        ) : (
          <img
            src={photoUrl}
            alt="Location"
            className="w-full h-full object-cover"
          />
        )}
        
        <div className="absolute inset-0 bg-gradient-to-t from-[#fb923c]/80 to-transparent" />
        
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <h2 className="text-4xl font-black text-white mb-4 drop-shadow-lg">
            {trip?.userSelection?.location?.label || "Your Dream Destination"}
          </h2>
          
          <div className="flex flex-wrap gap-3">
            <div className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white font-medium">
              {trip?.userSelection?.noOfDays || "N/A"} Days
            </div>
            <div className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white font-medium">
              {trip?.userSelection?.budget || "Flexible"} Budget
            </div>
            <div className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white font-medium">
              {trip?.userSelection?.traveller || "Group"} Travelers
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="bg-white p-8">
        <div className="flex justify-between items-start">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-[#f56551] to-[#ff922b] bg-clip-text text-transparent">
              Trip Overview
            </h2>
            <p className="text-gray-600 max-w-2xl leading-relaxed">
              {trip?.TripData?.summary || "Your personalized AI-generated itinerary will appear here..."}
            </p>
          </div>
          
          <button className="bg-gradient-to-r from-[#f56551] to-[#ff922b] p-4 rounded-2xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
            <IoIosSend className="h-6 w-6 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default InfoSection;