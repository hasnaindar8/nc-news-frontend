import { useEffect, useState } from "react";
import Loading from "../Loading/Loading.jsx";
import Error from "../Error/Error.jsx";
import CommentCard from "../CommentCard/CommentCard.jsx";
import styles from "./CommentsList.module.css";

function CommentsList({ articleId }) {
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

  if (isLoading) {
    return <Loading>Loading...</Loading>;
  }

  if (isError) {
    return <Error>Something went wrong</Error>;
  }

  return (
    <section className={styles.commentList}>
      <h3>Comments</h3>
      {comments.map((comment) => {
        return <CommentCard key={comment.comment_id} comment={comment} />;
      })}
    </section>
  );
}

export default CommentsList;
