import NavBar from "../NavBar/NavBar.jsx";
import styles from "./Header.module.css";
function Header() {
  return (
    <header className={styles.header}>
      <h1>NC News</h1>
      <NavBar />
    </header>
  );
}
export default Header;
