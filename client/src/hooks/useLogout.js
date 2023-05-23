import { useUserContext } from "./useUserContext";
import { useNavigate } from "react-router-dom";
import { useBlogContext } from "./useBlogContext";

export const useLogout = () => {
  const { dispatch } = useUserContext();
  const { dispatch: blogDispatch } = useBlogContext();
  const navigate = useNavigate();

  const logout = () => {
    dispatch({ type: "LOGOUT" });
    blogDispatch({ type: "CLEAR_BLOGS" });
    navigate("/login");
    localStorage.removeItem("user");
  };
  return { logout };
};
