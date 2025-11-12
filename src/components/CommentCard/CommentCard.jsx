import styles from "./CommentCard.module.css";

function CommentCard({ comment }) {
  const { comment_id, body, votes, author, created_at } = comment;
  const date = new Date(created_at);
  return (
    <article className={styles.commentCard}>
      <header className={styles.commentHeader}>
        <h6 className={styles.commentAuthor}>{author}</h6>
        <button className={styles.commentDelete}>Delete</button>
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
