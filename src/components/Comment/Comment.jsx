import { useEffect, useState } from "react";
import CommentsList from "../CommentsList/CommentsList.jsx";
import CommentForm from "../CommentForm/CommentForm.jsx";
import styles from "./Comment.module.css";

function Comment({ articleId }) {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  async function fetchComments() {
    try {
      const url = `https://nc-news-backend-02ex.onrender.com/api/articles/${articleId}/comments`;
      const response = await fetch(url);
      const data = await response.json();
      setComments(data.comments);
    } catch (error) {
      console.log(error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchComments();
  }, []);

  return (
    <section className={styles.comment}>
      <h3>Comments ({comments && comments.length})</h3>
      <CommentForm articleId={articleId} fetchComments={fetchComments} />
      <CommentsList
        comments={comments}
        isLoading={isLoading}
        isError={isError}
        fetchComments={fetchComments}
      />
    </section>
  );
}
export default Comment;
