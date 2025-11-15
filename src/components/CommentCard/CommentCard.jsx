import { useState } from "react";
import styles from "./CommentCard.module.css";

function CommentCard({ comment, fetchComments, user }) {
  const [isDeleting, setIsDeleting] = useState(false);

  const { comment_id, body, votes, author, created_at } = comment;
  const date = new Date(created_at);

  async function handleClick() {
    try {
      setIsDeleting(true);
      await fetch(
        `https://nc-news-backend-02ex.onrender.com/api/comments/${comment_id}`,
        {
          method: "DELETE",
        }
      );
      fetchComments();
    } catch (error) {
      console.log(error);
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <article className={styles.commentCard}>
      <header className={styles.commentHeader}>
        <h6 className={styles.commentAuthor}>{author}</h6>
        {author === user.username ? (
          <button
            className={styles.commentDelete}
            onClick={handleClick}
            disabled={isDeleting}
          >
            Delete
          </button>
        ) : null}
      </header>

      <p className={styles.commentBody}>{body}</p>

      <footer className={styles.commentFooter}>
        <span className={styles.commentVotes}>Votes: {votes}</span>
        <time className={styles.commentTime} dateTime={date.toISOString()}>
          {date.toLocaleDateString("en-GB")}{" "}
          {date.toLocaleTimeString("en-GB", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </time>
      </footer>
    </article>
  );
}

export default CommentCard;
