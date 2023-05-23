import { useState } from "react";
import { useUserContext } from "../hooks/useUserContext";
const AddComment = ({ post_id, comments, setComments }) => {
  const [comment, setComment] = useState("");
  const { user } = useUserContext();
  const [error, setError] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const res = await fetch("/api/comment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify({
        post_id,
        comment_content: comment,
      }),
    });

    const data = await res.json();

    if (res.ok) {
      setError("");
      setComment("");
      setComments([data, ...comments]);
    }

    if (!res.ok) {
      setError(data.error);
    }
  };

  return (
    <>
      <div className="add-comment">
        <input
          type="text"
          onChange={(e) => setComment(e.target.value)}
          placeholder="Add Comment"
          value={comment}
        />
        <button onClick={handleSubmit}>Comment</button>
      </div>
      {error && <div className="error">{error}</div>}
    </>
  );
};

export default AddComment;
