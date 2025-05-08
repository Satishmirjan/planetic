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
    <div className="min-h-screen pt-20" style={{ background: 'radial-gradient(ellipse at center, #FED7D5 0%, #FB923C 100%)' }}>
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <h1 className="text-3xl font-bold mb-6 text-white">My Trip History</h1>
        {trips.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 text-center">
            <p className="text-gray-600">No trips found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trips.map((trip) => (
              <UserTripsCardItem key={trip.id} trip={trip} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyTrips;
