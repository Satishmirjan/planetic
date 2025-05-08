import React, { useEffect, useCallback } from 'react';
import { Button } from '../ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';

function Header() {
  const user = JSON.parse(localStorage.getItem('user'));
  const [openDailog, setOpenDialog] = React.useState(false);

  const GetUserProfile = useCallback(async (accessToken) => {
    try {
      const response = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo`, {
        headers: {
          Authorization: `Bearer ${accessToken?.access_token}`,
          Accept: 'application/json'
        }
      });
      localStorage.setItem('user', JSON.stringify(response.data));
      setOpenDialog(false);
      window.location.reload();
    } catch (error) {
      console.error('Error fetching user profile:', error);
      setOpenDialog(false);
    }
  }, []);

  const login = useGoogleLogin({
    onSuccess: GetUserProfile,
    onError: (error) => {
      console.error("Login Failed:", error);
      setOpenDialog(false);
    },
    flow: 'auth-code',
    scope: 'email profile',
    redirect_uri: "https://planetic-wft3.vercel.app",
    ux_mode: 'redirect',
    access_type: 'offline',
    prompt: 'consent'
  });

  const handleLogout = useCallback(() => {
    googleLogout();
    localStorage.clear();
    window.location.reload();
  }, []);

  return (
    <div className='fixed w-full p-2 flex justify-between items-center px-6 bg-white/80 backdrop-blur-md z-50 border-b'>
      <a href="/" className='flex items-center gap-2 hover:scale-105 transition-transform'>
        <img 
          src='/Planetic.png' 
          alt="Logo" 
          className="h-12 w-auto" 
        />
      </a>

      {user ? (
        <div className="flex items-center gap-4">
          <a href="/trip" className="text-sm font-semibold text-[#f56551] hover:text-[#e55341] transition-colors px-3 py-1.5 rounded-lg bg-orange-50">
            Create Trip
          </a>
          <a href="/my-trips">
            <Button className="bg-[#f56551] hover:bg-[#e55341] text-white shadow-md py-1.5">
              My Trips
            </Button>
          </a>
          <Popover>
            <PopoverTrigger>
              <img 
                src={user?.picture} 
                alt="User" 
                className="w-8 h-8 rounded-full border-2 border-white shadow-lg hover:shadow-xl transition-shadow"
              />
            </PopoverTrigger>
            <PopoverContent className='w-48 p-2 text-center'>
              <button
                onClick={handleLogout}
                className="w-full py-3 text-red-600 hover:bg-red-50 font-semibold rounded-lg transition-colors"
              >
                Log Out
              </button>
            </PopoverContent>
          </Popover>
        </div>
      ) : (
        <Button 
          onClick={() => setOpenDialog(true)}
          className="bg-[#f56551] hover:bg-[#e55341] text-white px-8 py-6 shadow-md hover:shadow-lg"
        >
          Get Started
        </Button>
      )}

      <Dialog open={openDailog} onOpenChange={setOpenDialog}>
        <DialogContent className="rounded-xl max-w-md">
          <DialogHeader>
            <DialogTitle className='text-center text-2xl font-bold bg-gradient-to-r from-[#f56551] to-[#ff922b] bg-clip-text text-transparent'>
              Welcome to TripAI
            </DialogTitle>
          </DialogHeader>
          <DialogDescription className='text-center'>
            <img src="/logo.svg" alt="Logo" className='mx-auto w-20 mt-4' />
            <p className="text-gray-600 mt-4 font-medium">
              Create your account to start planning
            </p>
          </DialogDescription>
          <div className='mt-6 space-y-4'>
            <Button
              onClick={login}
              className="w-full flex gap-4 items-center justify-center bg-white hover:bg-gray-50 text-gray-700 shadow-md hover:shadow-lg border border-gray-200 py-6 text-base"
            >
              <FcGoogle className="h-7 w-7" />
              <span className="font-semibold">Continue with Google</span>
            </Button>
            <p className="text-center text-sm text-gray-500 mt-4 px-6">
              By continuing, you agree to our Terms of Service and Privacy Policy
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Header;