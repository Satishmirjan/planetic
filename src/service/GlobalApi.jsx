const BASE_URL='https://places.googleapis.com/v1/places:searchText'
import axios from 'axios'
const config={
  headers:{
    'Content-Type':'application/json',
    'X-Goog-Api-key':import.meta.env.VITE_GOOGLE_API,
    'X-Goog-FieldMask':[
      'places.photos',
      'places.displayName',
      'places.id'
    ]
  }
}
export const getPlaceDetails=(data)=>axios.post(BASE_URL,data,config)
export const PHOTO_REF_URL = `https://places.googleapis.com/v1/{NAME}/media?maxHeightPx=600&maxWidthPx=600&key=${import.meta.env.VITE_GOOGLE_API}`;
