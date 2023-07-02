import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./global.css";
import { Toaster } from "react-hot-toast";
import Providers from "./Providers";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
    <Providers>
      <App />
      <Toaster
          position="top-center"
          toastOptions={{
              duration: 5000,
              style   : {
                  fontFamily: "roboto,sans-serif"
              },
              success : {
                  duration: 3000,
                  theme   : {
                      primary  : "green",
                      secondary: "black"
                  }
              }
          }}
      />
    </Providers>
  </React.StrictMode>
);
