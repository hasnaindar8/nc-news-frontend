import { Link } from "react-router";
import styles from "./Footer.module.css";

function Footer() {
  return (
    <footer className={styles.footer}>
      <p className={styles.footerCopy}>
        &copy; {new Date().getFullYear()}{" "}
        <Link to="/" className={styles.link}>
          NC News
        </Link>
        . All rights reserved.
      </p>
    </footer>
  );
}
export default Footer;
