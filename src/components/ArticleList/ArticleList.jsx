import { useEffect, useState } from "react";
import ArticleCard from "../ArticleCard/ArticleCard.jsx";
import styles from "./ArticleList.module.css";
import Loading from "../Loading/Loading.jsx";
import Error from "../ErrorMessage/ErrorMessage.jsx";
import ArticleFilter from "../ArticleFilter/ArticleFilter.jsx";
import { useSearchParams } from "react-router";

function ArticleList(props) {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
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
  }, [props, sortBy, order]);

  if (isLoading) {
    return <Loading>Loading...</Loading>;
  }

  if (isError) {
    return <Error>Something went wrong</Error>;
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
