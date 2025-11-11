import styles from "./Footer.module.css";
function Footer() {
  return (
    <footer className={styles.footer}>
      <p className={styles.footerCopy}>
        &copy; {new Date().getFullYear()} NC News. All rights reserved.
      </p>
    </footer>
  );
}
export default Footer;
