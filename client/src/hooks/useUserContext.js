import { useContext } from "react";
import { userContext } from "../context/userContext";

export const useUserContext = () => {
  const context = useContext(userContext);

  if (!context) throw new Error("UserContext is not available");

  return context;
};
