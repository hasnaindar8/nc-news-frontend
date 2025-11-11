import styles from "./Loading.module.css";
function Loading(props) {
  return (
    <section className={styles.loading}>
      <p>{props.children}</p>
    </section>
  );
}
export default Loading;
