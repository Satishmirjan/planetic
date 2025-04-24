

import { getDocs, query, collection, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../service/firebaseConfig';
import UserTripsCardItem from './components/UserTripCardItem';

function MyTrips() {



  
  const navigate = useNavigate();
  const [trips, setTrips] = useState([]); // ✅ State to store trips

  useEffect(() => {
    GetUserTrips();
  }, []);

  const GetUserTrips = async () => {
    const user = JSON.parse(localStorage.getItem('user'));

    if (!user) {
      navigate('/');
      return;
    }

    try {
      const q = query(collection(db, 'AITrips'), where('userEmail', '==', user.email));
      const querySnapshot = await getDocs(q);
      console.log('Query Snapshot:', querySnapshot);

      const userTrips = [];
      querySnapshot.forEach((doc) => {
        userTrips.push({ id: doc.id, ...doc.data() }); // ✅ Store trip data in state
      });

      setTrips(userTrips); // ✅ Update state with fetched trips
      console.log(trips)
    } catch (error) {
      console.error('Error fetching trips:', error);
    }
    console.log(trips)

  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">My Trip History</h1>
      {trips.length === 0 ? (
        <p>No trips found.</p>
      ) : (
        <div className="space-y-6">
          {trips.map((trip) => (
            // <div key={trip.id} className="border p-4 rounded-lg shadow-md">
            //   <h2 className="text-xl font-semibold">{trip.TripData.tripName}</h2>
          
            //   <p><strong>Budget:</strong> {trip.TripData.budget}</p>
            //   <p><strong>Travelers:</strong> {trip.TripData.travelers}</p>

            //   {/* Hotels List */}
            //   <h3 className="text-lg font-semibold mt-2">Hotels</h3>
            //   <ul className="list-disc pl-5">
            //     {trip.TripData.hotels.map((hotel, index) => (
            //       <li key={index}>
            //         <img src="./animal.jpg" alt="" />
            //         <strong>{hotel.hotelName}</strong> - {hotel.price} - {hotel.rating}⭐
            //       </li>
            //     ))}
            //   </ul>

            //   {/* Itinerary (FIXED) */}
            //   <h3 className="text-lg font-semibold mt-2">Itinerary</h3>
            //   {Object.keys(trip.TripData.itinerary).map((day, index) => (
            //     <div key={index}>
            //<h4 className="font-medium">{day.toUpperCase()}</h4>
            //       <ul className="list-disc pl-5">
                          
            //         {trip.TripData.itinerary[day].map((activity, i) => (
            //           <li key={i}>
            //              <img src="./animal.jpg" alt="" />
            //             <strong>{activity.placeName}</strong> - {activity.bestTimeToVisit}
            //             <br />
            //             <small>Rating: {activity.rating}⭐</small>
            //           </li>
            //         ))}
            //       </ul>
            //     </div>
            //   ))}
            // </div>
            
              <UserTripsCardItem key={trip.id} trip={trip} />
      

          ))}
        </div>
      )}
    </div>
  );
}

export default MyTrips;
