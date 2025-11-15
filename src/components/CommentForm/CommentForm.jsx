import { useState } from "react";
import Error from "../Error/Error.jsx";
import styles from "./CommentForm.module.css";
import { useUser } from "../../hooks/useUser.js";

function CommentForm({ articleId, fetchComments }) {
  const [comment, setComment] = useState("");
  const [isPosting, setIsPosting] = useState(false);
  const [isError, setIsError] = useState(false);

  const { user } = useUser();

  function handleChange({ target }) {
    setComment(target.value);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setComment("");
    setIsPosting(true);
    try {
      const response = await fetch(
        `https://nc-news-backend-02ex.onrender.com/api/articles/${articleId}/comments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username: user.username, body: comment }),
        }
      );

      const data = await response.json();
      if (data.msg) {
        throw new Error(data.msg);
      }
      fetchComments();
    } catch (error) {
      console.log(error);
      setIsError(true);
    } finally {
      setIsPosting(false);
    }
  }

  if (isError) {
    return <Error>Something went wrong</Error>;
  }

  return (
    <form className={styles.commentForm} action="#" onSubmit={handleSubmit}>
      <label htmlFor="comment-body">Add a Comment</label>
      <textarea
        id="comment-body"
        className={styles.commentTextArea}
        name="comment"
        placeholder={
          isPosting ? "submitting your comment..." : "Add your comment..."
        }
        value={comment}
        onChange={handleChange}
        required
      ></textarea>
      {comment && <button>Post</button>}
    </form>
  );
}
export default CommentForm;
