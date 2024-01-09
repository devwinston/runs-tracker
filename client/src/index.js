import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import { RunContextProvider } from "./contexts/runContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <RunContextProvider>
    <App />
  </RunContextProvider>
);
