import { Link } from "react-router";
import styles from "./ArticleCard.module.css";
function ArticleCard({ article }) {
  const {
    article_id,
    title,
    author,
    created_at,
    article_img_url,
    topic,
    votes,
    comment_count,
  } = article;

  return (
    <Link to={`/articles/${article_id}`} className={styles.link}>
      <article className={styles.card}>
        <header>
          <h2 className={styles.cardTitle}>{title}</h2>
        </header>

        {article_img_url && (
          <figure>
            <img
              src={article_img_url}
              alt={title}
              className={styles.cardImage}
            />
          </figure>
        )}

        <footer className={styles.cardFooter}>
          <div className={styles.cardMeta}>
            <span>{author}</span>
            <time dateTime={created_at}>
              {new Date(created_at).toLocaleDateString()}
            </time>
          </div>
          <div className={styles.cardStats}>
            <span className={styles.cardTopic}>{topic}</span>
            <span>Votes: {votes}</span>
            <span>Comments: {comment_count}</span>
          </div>
        </footer>
      </article>
    </Link>
  );
}
export default ArticleCard;
