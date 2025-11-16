import { useEffect, useState } from "react";
import ArticleCard from "../ArticleCard/ArticleCard.jsx";
import styles from "./ArticleList.module.css";
import Loading from "../Loading/Loading.jsx";
import ErrorMessage from "../ErrorMessage/ErrorMessage.jsx";
import ArticleFilter from "../ArticleFilter/ArticleFilter.jsx";
import { useSearchParams } from "react-router";

function ArticleList(props) {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [sortBy, setSortBy] = useState(
    searchParams.get("sort_by") || "created_at"
  );
  const [order, setOrder] = useState(searchParams.get("order") || "desc");

  const { topic } = props;

  async function fetchArticles() {
    try {
      let url = "https://nc-news-backend-02ex.onrender.com/api/articles";

      url += topic
        ? `?topic=${topic}&sort_by=${sortBy}&order=${order}`
        : `?sort_by=${sortBy}&order=${order}`;

      const response = await fetch(url);
      const data = await response.json();
      if (data.msg) {
        throw new Error(data.msg);
      }
      setArticles(data.articles);
    } catch (err) {
      console.log(err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchArticles();
  }, [props, sortBy, order]);

  if (isLoading) {
    return <Loading>Loading...</Loading>;
  }

  if (error) {
    return <ErrorMessage>{error}</ErrorMessage>;
  }

  return (
    <>
      <ArticleFilter
        sortBy={sortBy}
        setSortBy={setSortBy}
        order={order}
        setOrder={setOrder}
        searchParams={searchParams}
        setSearchParams={setSearchParams}
      />
      <section className={styles.grid}>
        {articles &&
          articles.map((article) => (
            <ArticleCard key={article.article_id} article={article} />
          ))}
      </section>
    </>
  );
}
export default ArticleList;
