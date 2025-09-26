// src/App.jsx
import { Routes, Route } from "react-router-dom"; // ✅ No need to import BrowserRouter here
import { Toaster } from "react-hot-toast";

import Menubar from "./components/Menubar";
import LandingPage from "./pages/LandingPage";
import DashBox from "./pages/DashBox";
import MainPage from "./pages/MainPage";
import PreviewPage from "./pages/PreviewPage";

import { AppContextProvider } from "./contexts/AppContext";
import UserSyncHandler from "./components/UserSyncHandler";

import { RedirectToSignIn, SignedIn, SignedOut } from "@clerk/clerk-react";

const App = () => {
  return (
    <AppContextProvider>
      <UserSyncHandler />
      <Menubar />
      <Toaster position="top-center" toastOptions={{ duration: 3000 }} />
      <Routes>
        <Route path="/" element={<LandingPage />} />

        <Route
          path="/DashBox"
          element={
            <>
              <SignedIn>
                <DashBox />
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </>
          }
        />

        <Route
          path="/generate"
          element={
            <>
              <SignedIn>
                <MainPage />
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </>
          }
        />

        <Route
          path="/PreviewPage"
          element={
            <>
              <SignedIn>
                <PreviewPage />
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </>
          }
        />
      </Routes>
    </AppContextProvider>
  );
};

export default App;
