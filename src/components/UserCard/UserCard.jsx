import useUser from "../../hooks/useUser";
import styles from "./UserCard.module.css";

function UserCard({ user, isLoggedIn }) {
  const { setAuthUser } = useUser();
  const { name, username, avatar_url } = user;

  function handleClick() {
    setAuthUser(user);
  }

  return (
    <article className={styles.card}>
      <h2 className={styles.name}>{name}</h2>
      <p className={styles.username}>{username}</p>
      <figure className={styles.figure}>
        <img
          className={styles.avatar}
          src={avatar_url}
          alt={`${avatar_url} avatar`}
        />
      </figure>
      <button
        className={styles.button}
        disabled={isLoggedIn}
        onClick={handleClick}
      >
        Login
      </button>
    </article>
  );
}

export default UserCard;
