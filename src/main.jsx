import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom"; // ✅ Import this
import "./index.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import "bootstrap/dist/css/bootstrap.css";

import App from "./App.jsx";
import { AppContextProvider } from "./contexts/AppContext.jsx";
import { ClerkProvider } from "@clerk/clerk-react";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
if (!PUBLISHABLE_KEY) {
  throw new Error("PUBLISHABLE_KEY key is missing");
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AppContextProvider>
      <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
        <BrowserRouter> {/* ✅ Wrap App with BrowserRouter */}
          <App />
        </BrowserRouter>
      </ClerkProvider>
    </AppContextProvider>
  </StrictMode>
);
