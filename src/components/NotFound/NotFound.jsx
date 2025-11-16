import { Link } from "react-router";
import styles from "./NotFound.module.css";

function NotFound() {
  return (
    <section className={styles.notFound}>
      <h2>404 - Page Not Found</h2>
      <p>Sorry, the page you are looking for does not exist.</p>
      <Link to="/">Return Home</Link>
    </section>
  );
}

export default NotFound;
