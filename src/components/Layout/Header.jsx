import { Link } from "react-router";
import NavBar from "../NavBar/NavBar.jsx";
import styles from "./Header.module.css";

function Header() {
  return (
    <header className={styles.header}>
      <Link to="/" className={styles.link}>
        <h1>
          <strong>NC</strong> News
        </h1>
      </Link>
      <NavBar />
    </header>
  );
}
export default Header;
