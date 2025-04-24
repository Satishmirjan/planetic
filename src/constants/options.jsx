

export const SelectTravelList = [
  { id: 1, title: "Just Me", desc: "A sole traveler in exploration", icon: "✈️", people: "1" },
  { id: 2, title: "A Couple", desc: "Two travelers in tandem", icon: "🥂", people: "2" },
  { id: 3, title: "Family", desc: "A group of fun-loving adventurers", icon: "🏡", people: "4" },
  { id: 4, title: "Friends", desc: "A bunch of thrill-seekers", icon: "⛵", people: "3" }
]


export const SelectBudgetOptions = [
  {
    id: 1,
    title: "Cheap",
    desc: "Stay conscious of costs",
    icon: "💰",
  },
  {
    id: 2,
    title: "Medium",
    desc: "Balance comfort and expenses",
    icon: "💵",
  },
  {
    id: 3,
    title: "High",
    desc: "Enjoy premium experiences",
    icon: "🪙",
  }
];



export const AI_PROMPT='generate travel plan for location :{location}, for {totalDays} Days for {traveller}with a {budget}budget, give me Hotels options list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and suggest itinerary with placeName, Place Details, Place Image Url, Geo Coordinates, ticket Pricing, Time travel each of the location for {totalDays} days with each day plan with best time to visit in JSON format.'