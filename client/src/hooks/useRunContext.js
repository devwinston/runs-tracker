import { useContext } from "react";
import { RunContext } from "../contexts/runContext";

export const useRunContext = () => {
  const context = useContext(RunContext);

  if (!context) {
    throw new Error("useRunContext not used within RunContextProvider");
  }

  return context;
};
