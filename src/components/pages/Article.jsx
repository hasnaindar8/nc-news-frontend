import { useParams } from "react-router";
import IndividualArticle from "../IndividualArticle/IndividualArticle.jsx";
import { useUser } from "../../hooks/useUser.js";

function Article() {
  const { article_id } = useParams();
  return <IndividualArticle articleId={article_id} />;
}
export default Article;
