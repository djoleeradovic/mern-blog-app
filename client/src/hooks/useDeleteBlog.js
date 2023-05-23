import { useBlogContext } from "./useBlogContext";
import { useUserContext } from "./useUserContext";
import { useNavigate } from "react-router-dom";

export const useDeleteBlog = () => {
  const { user } = useUserContext();
  const navigate = useNavigate();
  const { dispatch } = useBlogContext();

  const deleteBlog = async (id) => {
    const res = await fetch("/api/blog/", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify({
        id,
      }),
    });

    const data = await res.json();

    if (res.ok) {
      dispatch({
        type: "DELETE_BLOG",
        payload: data,
      });
      navigate("/");
    }
  };
  return { deleteBlog };
};
