// import React from 'react';
// import { Link } from 'react-router-dom';

// function Hotels({ trip }) {

//   console.log(trip?.TripData?.hotels);
//   return (
//     <div>
//        <img 
//               src="/animal.jpg" 
              
//               className="rounded-xl w-full h-40 object-cover" 
//             />
            
//       <h2 className="font-bold text-xl mt-5">Hotel Recommendation</h2>
//       <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
//         {trip?.TripData?.hotels?.map((hotel, index) => (
//           <Link to= `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(hotel?.hotelName + ' ' + hotel?.hotelAddress)}`></Link>

//           <div key={index} className="p-4 border rounded-lg shadow-md">
//             {/* New Hotel Image */}
//             <img 
//               src="https://source.unsplash.com/400x300/?hotel,room" 
//               alt={`Hotel ${hotel?.hotelName}`} 
//               className="rounded-xl w-full h-40 object-cover" 
//             />
            
//             {/* Hotel Details */}
//             <div className="my-2">
//               <h2 className="font-medium">{hotel?.hotelName}</h2>
//               <h2 className="text-xs text-gray-500">{hotel?.hotelAddress}</h2>
//               <h2 className="text-xs text-gray-500">Price: {hotel?.price}</h2>
//               <h2 className="text-xs text-gray-500">Rating: {hotel?.rating} ⭐</h2>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Hotels;

// import React from 'react';

// function Hotels({ trip }) {
//   console.log(trip?.TripData?.hotels);

//   return (
//     <div>
//       {/* Header Image */}
//       <img 
//         src="https://source.unsplash.com/1200x400/?travel,destination" 
//         alt="Travel Destination"
//         className="rounded-xl w-full h-40 object-cover" 
//       />
            
//       <h2 className="font-bold text-xl mt-5">Hotel Recommendations</h2>
//       <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
//         {trip?.TripData?.hotels?.map((hotel, index) => {
//           const googleMapsSearchUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(hotel?.hotelName + ' ' + hotel?.hotelAddress)}`;

//           return (
//             <div key={index} className="p-4 border rounded-lg shadow-md">
//               {/* Clickable Image (Opens Google Maps) */}
//               <a href={googleMapsSearchUrl} target="_blank" rel="noopener noreferrer">
//                 <img 
//                   src="https://source.unsplash.com/400x300/?hotel,room" 
//                   alt={`Hotel ${hotel?.hotelName}`} 
//                   className="rounded-xl w-full h-40 object-cover hover:opacity-80 transition duration-300" 
//                 />
//               </a>

//               {/* Hotel Details */}
//               <div className="my-2">
//                 <h2 className="font-medium">{hotel?.hotelName}</h2>
//                 <h2 className="text-xs text-gray-500">{hotel?.hotelAddress}</h2>
//                 <h2 className="text-xs text-gray-500">Price: {hotel?.price}</h2>
//                 <h2 className="text-xs text-gray-500">Rating: {hotel?.rating} ⭐</h2>
//                 <a 
//                   href={googleMapsSearchUrl} 
//                   target="_blank" 
//                   rel="noopener noreferrer" 
//                   className="text-blue-500 underline text-sm"
//                 >
//                   View on Google Maps
//                 </a>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }

// export default Hotels;

import React from 'react';
import HotelCardItem from './HotelCardItem';

function Hotels({ trip }) {
  console.log(trip?.TripData?.hotels);

  return (
    <div>
      <img 
        src="https://source.unsplash.com/1200x400/?travel,destination" 
        alt="Travel Destination"
        className="rounded-xl w-full h-40 object-cover" 
      />
      <h2 className="font-bold text-xl mt-5">Hotel Recommendations</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
        {trip?.TripData?.hotels?.map((hotel, index) => (
          <HotelCardItem key={index} hotel={hotel} />
        ))}
      </div>
    </div>
  );
}

export default Hotels;
