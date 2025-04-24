import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../service/firebaseConfig";
import InfoSection from "../components/InfoSection";
import Hotels from "../components/Hotels";
import PlacesToVisit from "../components/PlacesToVisit";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

function ViewTrip() {
  const { tripId } = useParams();
  const [trip, setTrip] = useState(null);

  useEffect(() => {
    const GetTripData = async () => {
      try {
        const docRef = doc(db, "AITrips", tripId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setTrip(docSnap.data());
        } else {
          toast.error("Trip details not found");
        }
      } catch (error) {
        console.error("Error fetching document:", error);
        toast.error("Failed to load trip details");
      }
    };

    if (tripId) GetTripData();
  }, [tripId]);

  return (
    <div className="min-h-screen" style={{ background: 'radial-gradient(ellipse at center, #FED7D5 0%, #FB923C 100%)' }}>
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-20">
        {trip ? (
          <div className="space-y-8">
            {/* Trip Header */}
            <div className="bg-white rounded-3xl shadow-xl p-8 mb-12 border-2 border-orange-100">
              <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-[#f56551] to-[#ff922b] bg-clip-text text-transparent mb-4">
                Your {trip?.userSelection?.noOfDays} Day Trip to {trip?.userSelection?.location?.label}
              </h1>
              <p className="text-lg text-gray-600">
                {trip?.TripData?.summary || "AI-generated personalized itinerary"}
              </p>
            </div>

            <InfoSection trip={trip} />
            
            <div className="bg-white rounded-3xl shadow-xl p-8 border-2 border-orange-100">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-[#f56551] to-[#ff922b] bg-clip-text text-transparent mb-8">
                🏨 Recommended Stays
              </h2>
              <Hotels trip={trip} />
            </div>

            <div className="bg-white rounded-3xl shadow-xl p-8 border-2 border-orange-100">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-[#f56551] to-[#ff922b] bg-clip-text text-transparent mb-8">
                🌟 Must-Visit Attractions
              </h2>
              <PlacesToVisit trip={trip} />
            </div>
          </div>
        ) : (
          <div className="flex justify-center items-center h-96">
            <AiOutlineLoading3Quarters className="animate-spin h-12 w-12 text-[#f56551]" />
          </div>
        )}
      </div>
    </div>
  );
}

export default ViewTrip;