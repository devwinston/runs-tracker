import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import { AuthContextProvider } from "./contexts/authContext";
import { RunContextProvider } from "./contexts/runContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthContextProvider>
    <RunContextProvider>
      <App />
    </RunContextProvider>
  </AuthContextProvider>
);
