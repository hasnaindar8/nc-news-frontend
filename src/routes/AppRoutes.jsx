import { Routes, Route } from "react-router";
import Layout from "../components/Layout/Layout.jsx";
import Home from "../components/Home/Home.jsx";
function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
      </Route>
    </Routes>
  );
}
export default AppRoutes;
