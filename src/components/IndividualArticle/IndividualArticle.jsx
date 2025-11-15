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
  const [isError, setIsError] = useState(false);

  async function fetchArticle() {
    try {
      const url = `https://nc-news-backend-02ex.onrender.com/api/articles/${articleId}`;
      const response = await fetch(url);
      const data = await response.json();
      setArticle(data.article);
      setVotes(data.article.votes);
    } catch (error) {
      console.log(error);
      setIsError(true);
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

  if (isError) {
    return <ErrorMessage>Something went wrong</ErrorMessage>;
  }

  return (
    <>
      <section>
        {article && (
          <article className={styles.article}>
            <header className={styles.articleHeader}>
              <h2 className={styles.title}>{article.title}</h2>
              <p className={styles.topic}>{article.topic}</p>
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
              <span>Author: {article.author}</span>
              <VoteControls
                articleId={articleId}
                votes={votes}
                setVotes={setVotes}
              />
              <time dateTime={article.created_at}>
                Published at:{" "}
                {new Date(article.created_at).toLocaleDateString()}
              </time>
            </footer>
          </article>
        )}
      </section>
      <UserProvider>
        <Comment articleId={articleId} />
      </UserProvider>
    </>
  );
}
export default IndividualArticle;
