import { useContext } from "react";
import { blogContext } from "../context/blogContext";

export const useBlogContext = () => {
  const context = useContext(blogContext);

  if (!context) throw new Error("UserContext is not available");

  return context;
};
