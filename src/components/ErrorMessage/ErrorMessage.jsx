import styles from "./ErrorMessage.module.css";

function ErrorMessage({ children }) {
  return (
    <section className={styles.error}>
      <p>{children}</p>
    </section>
  );
}
export default ErrorMessage;
