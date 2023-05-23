import { useState } from "react";
import { useUserContext } from "../hooks/useUserContext";
import { useNavigate } from "react-router-dom";

const AddBlog = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { user } = useUserContext();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/blog", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify({
        title,
        body: content,
      }),
    });

    if (res.ok) {
      setTitle("");
      setContent("");
      navigate("/");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="title">Title</label>
      <input
        type="text"
        id="title"
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Blog title"
      />
      <label htmlFor="body">Body</label>
      <textarea
        type="text"
        id="body"
        onChange={(e) => setContent(e.target.value)}
        placeholder="Blog content"
      ></textarea>
      <button>Add</button>
    </form>
  );
};

export default AddBlog;
