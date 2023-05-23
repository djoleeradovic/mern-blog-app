import { useBlogContext } from "../hooks/useBlogContext";
import { useUserContext } from "../hooks/useUserContext";
import { useEffect } from "react";
import { Blog } from "../components";

const Home = () => {
  const { blogs, dispatch } = useBlogContext();
  const { user } = useUserContext();

  useEffect(() => {
    const fetchBlogs = async () => {
      const res = await fetch("/api/blog", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      const data = await res.json();

      if (res.ok) {
        dispatch({ type: "SET_BLOGS", payload: data });
      }
    };

    fetchBlogs();
  }, [dispatch, user.token]);

  return (
    <section>
      <div className="blogs">
        {blogs && blogs.map((blog) => <Blog key={blog._id} blog={blog} />)}
      </div>
    </section>
  );
};

export default Home;
