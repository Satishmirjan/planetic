import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import Header from './components/custom/Header.jsx';
import App from './App.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import CreateTrip from './create-trip/index.jsx'; 
import ViewTrip from './view-trip/[tripId]/index.jsx';
import MyTrips from './my-trips/index.jsx';
import { Toaster } from 'sonner';
import { GoogleOAuthProvider } from '@react-oauth/google';

// Proper usage of environment variable
const CLIENT_ID = import.meta.env.VITE_GOOGLE_ID;

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/trip',
    element: <CreateTrip />,
    errorElement: <h1>Something went wrong!</h1>,
  },
  {
    path: '/view-trip/:tripId',
    element: <ViewTrip />,
  },
  {
    path: '/my-trips',
    element: <MyTrips />,
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={CLIENT_ID}>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 pt-24 pb-8">
          <Toaster />
          <RouterProvider router={router} />
        </main>
      </div>
    </GoogleOAuthProvider>
  </StrictMode>
);
