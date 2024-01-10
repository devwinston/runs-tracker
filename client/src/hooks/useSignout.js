import { useAuthContext } from "../hooks/useAuthContext";

export const useSignout = () => {
  const { dispatch } = useAuthContext();

  const signout = () => {
    // remove token from local storage
    localStorage.removeItem("user");

    // update auth context
    dispatch({ type: "SIGNOUT" });
  };

  return { signout };
};
