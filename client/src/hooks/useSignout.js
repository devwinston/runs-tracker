import { useAuthContext } from "../hooks/useAuthContext";
import { useRunContext } from "../hooks/useRunContext";

export const useSignout = () => {
  const { dispatch } = useAuthContext();
  const { dispatch: dispatchRun } = useRunContext();

  const signout = () => {
    // remove token from local storage
    localStorage.removeItem("user");

    // update auth context
    dispatch({ type: "SIGNOUT" });

    // update run context
    // prevent previous user run data stored in context to show momentarily
    dispatchRun({ type: "SET_RUNS", payload: [] });
    // [] instead of null to prevent length error
    dispatchRun({ type: "COMPUTE_STATS" });
  };

  return { signout };
};
