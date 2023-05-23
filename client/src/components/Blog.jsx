import { useUserContext } from "../hooks/useUserContext";
import { Link, useNavigate } from "react-router-dom";
import { useDeleteBlog } from "../hooks/useDeleteBlog";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { useBlogContext } from "../hooks/useBlogContext";

const Blog = ({ blog }) => {
  const { user } = useUserContext();
  const { deleteBlog } = useDeleteBlog();
  const navigate = useNavigate();
  const currentUser = user.username === blog.author;

  const handleDelete = async (e, id) => {
    e.preventDefault();
    deleteBlog(id);
  };

  const handleReadMore = (e, id) => {
    e.preventDefault();

    navigate(`/blog/${id}`);
  };

  return (
    <div className="blog">
      <small>
        {formatDistanceToNow(new Date(blog.createdAt), { addSuffix: true })}
      </small>
      <h1>{blog.title}</h1>
      <p>
        {blog.body.length > 300 ? blog.body.slice(0, 300) + "..." : blog.body}
      </p>
      <footer>
        <div className="buttons">
          <button onClick={(e) => handleReadMore(e, blog._id)}>
            Read More
          </button>
          {currentUser && (
            <button
              className="delete"
              onClick={(e) => handleDelete(e, blog._id)}
            >
              Delete
            </button>
          )}
        </div>

        <Link to={`/user/${blog.author}`}>Author: {blog.author}</Link>
      </footer>
    </div>
  );
};

export default Blog;
