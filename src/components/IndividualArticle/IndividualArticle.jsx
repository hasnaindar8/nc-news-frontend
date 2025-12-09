import { useEffect, useState } from "react";
import styles from "./IndividualArticle.module.css";
import Loading from "../Loading/Loading.jsx";
import ErrorMessage from "../ErrorMessage/ErrorMessage.jsx";
import Comment from "../Comment/Comment.jsx";
import { UserProvider } from "../../contexts/UserContext.jsx";
import VoteControls from "../VoteControls/VoteControls.jsx";

function IndividualArticle({ articleId }) {
  const [article, setArticle] = useState(null);
  const [votes, setVotes] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  async function fetchArticle() {
    try {
      const url = `https://nc-news-backend-02ex.onrender.com/api/articles/${articleId}`;
      const response = await fetch(url);
      const data = await response.json();
      if (data.msg) {
        throw new Error(data.msg);
      }
      setArticle(data.article);
      setVotes(data.article.votes);
    } catch (err) {
      console.log(err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchArticle();
  }, []);

  if (isLoading) {
    return <Loading>Loading...</Loading>;
  }

  if (error) {
    return <ErrorMessage>{error}</ErrorMessage>;
  }

  return (
    <>
      <section>
        {article && (
          <article className={styles.article}>
            <header className={styles.articleHeader}>
              <h2 className={styles.title}>{article.title}</h2>
              <p className={styles.topic}>{article.topic}</p>
              <address className={styles.author}>By {article.author}</address>
              <time dateTime={article.created_at}>
                {new Date(article.created_at).toLocaleString("en-GB", {
                  weekday: "short",
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                  hour: "numeric",
                  minute: "numeric",
                  hour12: true,
                })}
              </time>
            </header>
            <figure className={styles.figure}>
              <img
                className={styles.figureImg}
                src={article.article_img_url}
                alt={article.title}
              />
            </figure>
            <p className={styles.articleBody}>{article.body}</p>
            <footer className={styles.articleFooter}>
              <VoteControls
                articleId={articleId}
                votes={votes}
                setVotes={setVotes}
              />
            </footer>
          </article>
        )}
      </section>
      <Comment articleId={articleId} />
    </>
  );
}
export default IndividualArticle;
