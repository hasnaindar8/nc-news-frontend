import { useEffect, useState } from "react";
import ArticleCard from "../ArticleCard/ArticleCard.jsx";
import styles from "./ArticleList.module.css";
import Loading from "../Loading/Loading.jsx";
import Error from "../Error/Error.jsx";

function ArticleList(props) {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const { topic } = props;

  async function fetchArticles() {
    try {
      let url = "https://nc-news-backend-02ex.onrender.com/api/articles";

      if (topic) {
        url += `?topic=${topic}`;
      }
      const response = await fetch(url);
      const data = await response.json();
      setArticles(data.articles);
    } catch (error) {
      console.log(error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchArticles();
  }, [props]);

  if (isLoading) {
    return <Loading>Loading...</Loading>;
  }

  if (isError) {
    return <Error>Something went wrong</Error>;
  }

  return (
    <section className={styles.grid}>
      {articles &&
        articles.map((article) => (
          <ArticleCard key={article.article_id} article={article} />
        ))}
    </section>
  );
}
export default ArticleList;
