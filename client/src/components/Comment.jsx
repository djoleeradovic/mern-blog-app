import { Link } from "react-router-dom";
import { useUserContext } from "../hooks/useUserContext";

const Comment = ({ comment_content, author, id, comments, setComments }) => {
  const { user } = useUserContext();

  const currentUser = user.username === author;

  const deleteComment = async () => {
    const res = await fetch(`/api/comment/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });

    const data = await res.json();

    if (res.ok) {
      setComments(comments.filter((c) => c._id !== id));
    }

    if (!res.ok) {
      console.log(data.error);
    }
  };

  return (
    <div className="comment">
      <p>{comment_content}</p>
      <div>
        <h4>
          <Link to={`/user/${author}`}>{author}</Link>
        </h4>
        {currentUser && (
          <button className="delete" onClick={deleteComment}>
            Delete
          </button>
        )}
      </div>
    </div>
  );
};

export default Comment;
