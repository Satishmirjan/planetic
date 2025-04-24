import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GOOGLE_GEMINI_AI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};


  export const chatSession = model.startChat({
    generationConfig,
    history: [
      {
        role: "user",
        parts: [
          {text: "\nGenerate Travel Plan for Location: Las Vegas, for 3 Days for Couple with a Cheap budget, Give me a Hotels options list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and suggest itinerary with placeName, Place Details, Place Image Url, Geo Coordinates, ticket Pricing, rating, Time travel each of the location for 3 days with each day plan with best time to visitin JSON format.\n\n"},
        ],
      },
      {
        role: "model",
        parts: [
          {text: "I cannot directly access and display images or real-time pricing for hotels.  Hotel prices are highly dynamic and depend on the season, booking platform, and availability.  Similarly, I cannot provide geo-coordinates with the same level of precision. However, I can provide you with a JSON structure containing the information you requested, populated with placeholder data where real-time information is needed.  You will need to use a hotel booking site (like Expedia, Booking.com, Kayak, etc.) and Google Maps to find the most up-to-date information and images.\n\n```json\n{\n  \"tripName\": \"Las Vegas Budget Trip for Couples (3 Days)\",\n  \"budget\": \"Cheap\",\n  \"travelers\": 2,\n  \"hotels\": [\n    {\n      \"hotelName\": \"Circus Circus Hotel & Casino\",\n      \"hotelAddress\": \"2880 S Las Vegas Blvd, Las Vegas, NV 89109\",\n      \"price\": \"Placeholder - Check Booking Sites\",\n      \"hotelImageUrl\": \"Placeholder URL - Search Google Images\",\n      \"geoCoordinates\": \"Placeholder - Use Google Maps\",\n      \"rating\": \"3.5\",\n      \"description\": \"A budget-friendly option on the Strip known for its circus acts and affordable rooms.\"\n    },\n    {\n      \"hotelName\": \"Excalibur Hotel & Casino\",\n      \"hotelAddress\": \"3850 S Las Vegas Blvd, Las Vegas, NV 89109\",\n      \"price\": \"Placeholder - Check Booking Sites\",\n      \"hotelImageUrl\": \"Placeholder URL - Search Google Images\",\n      \"geoCoordinates\": \"Placeholder - Use Google Maps\",\n      \"rating\": \"3.0\",\n      \"description\": \"A themed hotel on the Strip offering a more affordable stay compared to luxury options.\"\n    },\n    {\n      \"hotelName\": \"The LINQ Hotel + Experience\",\n      \"hotelAddress\": \"3535 Las Vegas Blvd S, Las Vegas, NV 89109\",\n      \"price\": \"Placeholder - Check Booking Sites\",\n      \"hotelImageUrl\": \"Placeholder URL - Search Google Images\",\n      \"geoCoordinates\": \"Placeholder - Use Google Maps\",\n      \"rating\": \"4.0\",\n      \"description\": \"A moderately priced hotel on the Strip with access to The LINQ Promenade.\"\n    }\n\n  ],\n  \"itinerary\": {\n    \"day1\": [\n      {\n        \"placeName\": \"The Strip (South)\",\n        \"placeDetails\": \"Walk the south end of the Strip, see the Bellagio Fountains, explore the shops and casinos.\",\n        \"placeImageUrl\": \"Placeholder URL - Search Google Images\",\n        \"geoCoordinates\": \"Placeholder - Use Google Maps\",\n        \"ticketPricing\": \"Free (unless gambling or shopping)\",\n        \"rating\": \"4.5\",\n        \"timeToSpend\": \"4 hours\",\n        \"bestTimeToVisit\": \"Evening for Fountains\"\n      },\n      {\n        \"placeName\": \"In-N-Out Burger\",\n        \"placeDetails\": \"Grab a classic West Coast burger for a cheap and delicious meal.\",\n        \"placeImageUrl\": \"Placeholder URL - Search Google Images\",\n        \"geoCoordinates\": \"Placeholder - Use Google Maps\",\n        \"ticketPricing\": \"~$10-15 per person\",\n        \"rating\": \"4.0\",\n        \"timeToSpend\": \"1 hour\",\n        \"bestTimeToVisit\": \"Anytime\"\n      }\n    ],\n    \"day2\": [\n      {\n        \"placeName\": \"Fremont Street Experience\",\n        \"placeDetails\": \"Downtown Las Vegas, see the Viva Vision light show.\",\n        \"placeImageUrl\": \"Placeholder URL - Search Google Images\",\n        \"geoCoordinates\": \"Placeholder - Use Google Maps\",\n        \"ticketPricing\": \"Free\",\n        \"rating\": \"4.0\",\n        \"timeToSpend\": \"3 hours\",\n        \"bestTimeToVisit\": \"Evening for light show\"\n      },\n      {\n        \"placeName\": \"Seven Magic Mountains\",\n        \"placeDetails\": \"Art installation south of the city (requires transport).\",\n        \"placeImageUrl\": \"Placeholder URL - Search Google Images\",\n        \"geoCoordinates\": \"Placeholder - Use Google Maps\",\n        \"ticketPricing\": \"Free\",\n        \"rating\": \"4.2\",\n        \"timeToSpend\": \"1.5 hours\",\n        \"bestTimeToVisit\": \"Afternoon\"\n      }      \n    ],\n    \"day3\": [\n      {\n        \"placeName\": \"Red Rock Canyon National Conservation Area\",\n        \"placeDetails\": \"Scenic drives and hiking trails outside the city (requires transport).\",\n        \"placeImageUrl\": \"Placeholder URL - Search Google Images\",\n        \"geoCoordinates\": \"Placeholder - Use Google Maps\",\n        \"ticketPricing\": \"~$15 per vehicle\",\n        \"rating\": \"4.5\",\n        \"timeToSpend\": \"4 hours\",\n        \"bestTimeToVisit\": \"Morning or late afternoon to avoid heat\"\n      },\n       {\n        \"placeName\": \"Cheap Eats Buffet\",\n        \"placeDetails\": \"Several casinos offer inexpensive buffets; research options before going.\",\n        \"placeImageUrl\": \"Placeholder URL - Search Google Images\",\n        \"geoCoordinates\": \"Placeholder - Use Google Maps\",\n        \"ticketPricing\": \"~$15-25 per person\",\n        \"rating\": \"3.5\",\n        \"timeToSpend\": \"1.5 hours\",\n        \"bestTimeToVisit\": \"Lunch or Dinner\"\n      }\n    ]\n  }\n}\n```\n\nRemember to replace the placeholder data with actual information you find online.  Public transportation in Las Vegas can be limited, so consider walking, ride-sharing, or the Deuce bus for budget-friendly transportation.  Enjoy your trip!\n"},
        ],
      },
    ],
  });

