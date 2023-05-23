import { useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { useBlogContext } from "../hooks/useBlogContext";
import { useDeleteBlog } from "../hooks/useDeleteBlog";
import { useUserContext } from "../hooks/useUserContext";
import { IoMdClose } from "react-icons/io";
import { AddComment } from "../components";
import { Comment } from "../components";

const BlogPage = () => {
  const { id } = useParams();
  const { user } = useUserContext();
  const { blogs, dispatch } = useBlogContext();
  const { deleteBlog } = useDeleteBlog();
  const [showModal, setShowModal] = useState();
  const [comments, setComments] = useState([]);
  const [title, setTitle] = useState();
  const [body, setBody] = useState();
  const titleRef = useRef();
  const bodyRef = useRef();

  useEffect(() => {
    const getComments = async () => {
      const res = await fetch(`/api/comment/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });

      const data = await res.json();

      if (res.ok) {
        setComments(data);
      }
    };
    getComments();
  }, [id, user.token]);

  useEffect(() => {
    const getBlog = async () => {
      const res = await fetch(`/api/blog/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });
      const data = await res.json();
      dispatch({ type: "CLEAR_BLOGS" });
      dispatch({
        type: "SET_BLOGS",
        payload: data,
      });
    };
    getBlog();
  }, [dispatch, user.token, id]);

  const handleDelete = async (e, id) => {
    e.preventDefault();
    deleteBlog(id);
  };

  const currentUser = user.username === blogs[0]?.author;

  const editBlog = async (e) => {
    e.preventDefault();
    const res = await fetch(`/api/blog/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify({
        title,
        body,
      }),
    });

    if (res.ok) {
      setShowModal(false);
    }
  };

  return (
    <>
      <div className="blog-page">
        <div className="header">
          <h1 ref={titleRef}>{blogs[0]?.title}</h1>
          <Link to={`/user/${blogs[0]?.author}`}>{blogs[0]?.author}</Link>
        </div>
        <p ref={bodyRef}>{blogs[0]?.body}</p>
        {currentUser ? (
          <>
            <div className="buttons">
              <button onClick={() => setShowModal(true)}>Edit</button>
              <button
                className="delete"
                onClick={(e) => handleDelete(e, blogs[0]?._id)}
              >
                Delete
              </button>
            </div>
            {showModal && (
              <div className="edit-modal">
                <IoMdClose onClick={() => setShowModal(false)} />
                <form>
                  <label htmlFor="title">Title</label>
                  <input
                    type="text"
                    onChange={(e) => setTitle(e.target.value)}
                    defaultValue={titleRef.current.innerHTML}
                    id="title"
                    placeholder="Blog title"
                  />
                  <label htmlFor="body">Body</label>
                  <textarea
                    type="text"
                    id="body"
                    defaultValue={bodyRef.current.innerHTML}
                    onChange={(e) => setBody(e.target.value)}
                    placeholder="Blog content"
                  ></textarea>
                  <button onClick={editBlog}>Edit</button>
                </form>
              </div>
            )}
          </>
        ) : (
          <></>
        )}
        <AddComment
          post_id={id}
          comments={comments}
          setComments={setComments}
        />
      </div>
      <div className="comments">
        <h2>Comments</h2>
        {comments.map((comment, idx) => {
          return (
            <Comment
              key={idx}
              comment_content={comment.comment_content}
              author={comment.author}
              id={comment._id}
              comments={comments}
              setComments={setComments}
            />
          );
        })}
      </div>
    </>
  );
};

export default BlogPage;
