import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { db } from "../service/firebaseConfig";
import { doc, setDoc } from "firebase/firestore"; 
import React, { useEffect, useState } from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { Input } from "@/components/ui/input";
import { Button } from '../components/ui/button';
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import axios from 'axios';
import { AI_PROMPT, SelectBudgetOptions, SelectTravelList } from '../constants/options';
import { chatSession } from '../service/AIModal';
import { useGoogleLogin } from '@react-oauth/google';
import { useNavigate } from "react-router-dom";

function CreateTrip() {
  const [place, setPlace] = useState();
  const [formData, setFormData] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const login = useGoogleLogin({
    onSuccess: async (response) => {
      console.log("Google Login Success:", response);
      const accessToken = response.access_token;
      
      // Fetch user profile after login
      await GetUserProfile(accessToken);
    },
    onError: (error) => {
      console.error("Login Failed:", error);
      toast("Google Sign-in failed. Please try again.");
    },
  });

  const SaveAiTrip = async (TripData) => {
    setLoading(true);
    const user = JSON.parse(localStorage.getItem('user'));
    const docId = Date.now().toString();
    await setDoc(doc(db, "AITrips", docId), {
      userSelection: formData,
      TripData: JSON.parse(TripData),
      userEmail: user?.email,
      id: docId
    });
    setLoading(false);
    navigate('/view-trip/' + docId);
  }

  // Fetch Google User Profile
  const GetUserProfile = async (accessToken) => {
    try {
      const resp = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: 'application/json'
        }
      });

      console.log("User Profile:", resp.data);
      localStorage.setItem('user', JSON.stringify(resp.data));
      
      // Close the dialog after successful login
      setOpenDialog(false);
      
      // Call trip generation after login
      onGenerateTrip();
    } catch (error) {
      console.error('Error fetching user profile:', error);
      toast("Failed to fetch user profile. Try again.");
    }
  };

  // Handle Form Input Changes
  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    console.log("Updated formData:", formData);
  }, [formData]);

  // Generate Trip Function
  const onGenerateTrip = async () => {
    const user = localStorage.getItem('user');

    if (!user) {
      setOpenDialog(true); // Show login dialog if user is not signed in
      return;
    }

    if (
      !formData?.location ||
      !formData?.budget ||
      !formData?.traveller ||
      !formData?.noOfDays ||
      formData?.noOfDays > 5
    ) {
      toast("Please fill all the details correctly");
      return;
    }
    setLoading(true);

    const FINAL_PROMPT = AI_PROMPT
      .replace('{location}', formData?.location?.label)
      .replace('{totalDays}', formData?.noOfDays)
      .replace('{traveller}', formData?.traveller)
      .replace('{budget}', formData?.budget);

    console.log("Generated Prompt:", FINAL_PROMPT);

    try {
      const result = await chatSession.sendMessage(FINAL_PROMPT);
      await SaveAiTrip(result?.response?.text());
      console.log("AI Response:", result?.response?.text());
    } catch (error) {
      console.error("Error generating trip:", error);
      toast("Failed to generate trip plan. Try again.");
    }
    setLoading(false);
  };


  return (
    <div className="py-10 md:py-16" style={{ background: 'radial-gradient(ellipse at center, #FED7D5 0%, #FB923C 100%)' }}>
      <div className="bg-white rounded-3xl shadow-2xl p-6 md:p-12 max-w-4xl mx-4 md:mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-black text-4xl md:text-5xl bg-gradient-to-r from-[#f56551] to-[#ff922b] bg-clip-text text-transparent mb-4">
            Plan Your Perfect Trip
          </h2>
          <p className="text-gray-600 text-lg md:text-xl">Answer a few questions and let AI create your personalized itinerary</p>
        </div>

        <div className="space-y-8 md:space-y-10">
          {/* Destination Selection */}
          <div className="bg-white rounded-2xl p-6 shadow-md border border-orange-100">
            <h2 className="text-2xl font-bold text-[#f56551] mb-6">🌍 Where do you want to go?</h2>
            <GooglePlacesAutocomplete
              apiKey={import.meta.env.VITE_GOOGLE_API}
              selectProps={{
                placeholder: 'Enter destination...',
                styles: {
                  control: (provided) => ({
                    ...provided,
                    padding: '12px 16px',
                    borderRadius: '14px',
                    border: '2px solid #fed7d5',
                    fontSize: '16px',
                    '&:hover': { borderColor: '#fb923c' },
                    '&:focus-within': { borderColor: '#f56551', boxShadow: 'none' }
                  }),
                  option: (provided) => ({
                    ...provided,
                    padding: '12px 16px',
                    fontSize: '16px'
                  })
                },
                onChange: (v) => {
                  setPlace(v);
                  handleInputChange('location', v);
                }
              }}
            />
          </div>

          {/* Number of Days */}
          <div className="bg-white rounded-2xl p-6 shadow-md border border-orange-100">
            <h2 className="text-2xl font-bold text-[#f56551] mb-6">📅 Trip Duration (Max 5 days)</h2>
            <Input 
              placeholder="Number of days (e.g. 3)" 
              type="number" 
              className="rounded-xl px-6 py-4 text-lg border-2 border-orange-100 focus:border-[#f56551]"
              onChange={(e) => handleInputChange('noOfDays', e.target.value)} 
            />
          </div>

          {/* Budget Range */}
          <div className="bg-white rounded-2xl p-6 shadow-md border border-orange-100">
            <h2 className="text-2xl font-bold text-[#f56551] mb-6">💰 Budget Range</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {SelectBudgetOptions.map((item, index) => (
                <div 
                  key={index} 
                  onClick={() => handleInputChange('budget', item.title)}
                  className={`p-6 border-2 rounded-2xl cursor-pointer transition-all duration-300 hover:scale-105 ${
                    formData.budget === item.title 
                      ? 'bg-orange-50 border-[#f56551] shadow-lg' 
                      : 'border-orange-100 hover:border-orange-200'
                  }`}
                >
                  <div className="text-4xl mb-4 text-[#fb923c]">{item.id}</div>
                  <h3 className="text-xl font-bold text-gray-800">{item.title}</h3>
                  <p className="text-gray-600 mt-2 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Travel Type */}
          <div className="bg-white rounded-2xl p-6 shadow-md border border-orange-100">
            <h2 className="text-2xl font-bold text-[#f56551] mb-6">👥 Travel Companions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {SelectTravelList.map((item, index) => (
                <div 
                  key={index} 
                  onClick={() => handleInputChange('traveller', item.people)}
                  className={`p-6 border-2 rounded-2xl cursor-pointer transition-all duration-300 hover:scale-105 ${
                    formData.traveller === item.people 
                      ? 'bg-orange-50 border-[#f56551] shadow-lg' 
                      : 'border-orange-100 hover:border-orange-200'
                  }`}
                >
                  <div className="text-4xl mb-4 text-[#fb923c]">{item.icon}</div>
                  <h3 className="text-xl font-bold text-gray-800">{item.title}</h3>
                  <p className="text-gray-600 mt-2">{item.desc}</p>
                  <div className="mt-4 text-sm font-medium text-[#f56551]">
                    {item.people} travelers
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Generate Button */}
        <div className="mt-14 text-center">
          <Button 
            disabled={loading}
            onClick={onGenerateTrip}
            className="bg-gradient-to-r from-[#f56551] to-[#ff922b] hover:from-[#e55341] hover:to-[#fb923c] text-white px-14 py-7 rounded-2xl text-xl font-bold shadow-xl hover:shadow-2xl transition-all"
          >
            {loading ? (
              <AiOutlineLoading3Quarters className="h-6 w-6 animate-spin mr-2" />
            ) : null}
            {loading ? "Crafting Your Adventure..." : "✨ Generate My Trip Plan"}
          </Button>
        </div>
      </div>

      {/* Login Dialog */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="rounded-3xl max-w-md p-8 border-2 border-orange-100">
          <DialogHeader>
            <DialogTitle className="text-center text-3xl font-black bg-gradient-to-r from-[#f56551] to-[#ff922b] bg-clip-text text-transparent">
              Join TripAI
            </DialogTitle>
          </DialogHeader>
          <div className="flex justify-center my-4">
            <img src="/logo.svg" alt="Logo" className="h-20 animate-bounce" />
          </div>
          <div className="mt-4 space-y-6">
            <p className="text-center text-gray-600 font-medium">
              Sign in to save and manage your AI-generated trip plans
            </p>
            <Button 
              onClick={login} 
              className="w-full py-6 flex gap-4 items-center justify-center rounded-xl bg-white border-2 border-gray-200 hover:border-[#f56551] hover:bg-orange-50 transition-all"
            >
              <FcGoogle className="h-7 w-7" />
              <span className="text-lg font-semibold text-gray-800">Continue with Google</span>
            </Button>
            <p className="text-center text-sm text-gray-500 px-4">
              By continuing, you agree to our Terms and Privacy Policy
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CreateTrip;