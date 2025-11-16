import { Routes, Route } from "react-router";
import Layout from "../components/Layout/Layout.jsx";
import Home from "../components/pages/Home.jsx";
import Article from "../components/pages/Article.jsx";
import Topic from "../components/pages/Topic.jsx";
import NotFound from "../components/NotFound/NotFound.jsx";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="articles/:article_id" element={<Article />} />
        <Route path="topics/:topic" element={<Topic />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
export default AppRoutes;
