import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useBlogContext } from "../hooks/useBlogContext";
import { useUserContext } from "../hooks/useUserContext";
import { Blog } from "../components";

const UserProfile = () => {
  const { username } = useParams();
  const { blogs, dispatch } = useBlogContext();
  const { user } = useUserContext();

  useEffect(() => {
    const fetchUserBlogs = async () => {
      const res = await fetch(`/api/blog/user/${username}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });

      const data = await res.json();

      if (res.ok) {
        dispatch({
          type: "SET_BLOGS",
          payload: data,
        });
      }
    };
    fetchUserBlogs();
  }, [dispatch, username, user.token]);

  return (
    <div className="user-profile">
      <h2>{username}'s posts </h2>
      <div className="blogs">
        {blogs.map((blog, idx) => (
          <Blog key={idx} blog={blog} />
        ))}
      </div>
    </div>
  );
};

export default UserProfile;
