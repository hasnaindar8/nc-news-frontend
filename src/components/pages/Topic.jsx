import { useParams } from "react-router";
import ArticleList from "../ArticleList/ArticleList.jsx";

function Topic() {
  const { topic } = useParams();
  return <ArticleList topic={topic} />;
}
export default Topic;
