import styles from "./Error.module.css";

function Error({ children }) {
  return (
    <section className={styles.error}>
      <p>{children}</p>
    </section>
  );
}
export default Error;
