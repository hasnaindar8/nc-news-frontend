import { NavLink } from "react-router";
import styles from "./NavBar.module.css";
import { useEffect, useState } from "react";
function NavBar() {
  const [topics, setTopics] = useState([]);

  async function fetchTopics() {
    try {
      const response = await fetch(
        "https://nc-news-backend-02ex.onrender.com/api/topics"
      );
      const data = await response.json();
      setTopics(data.topics);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchTopics();
  }, []);

  return (
    <nav className={styles.nav}>
      {topics &&
        topics.map((topic) => {
          return (
            <NavLink
              key={topic.slug}
              className={styles.link}
              to={`/topics/${topic.slug}`}
              end
            >
              {topic.slug}
            </NavLink>
          );
        })}
    </nav>
  );
}
export default NavBar;
