import { useEffect, useState } from "react";
import UserCard from "../UserCard/UserCard";
import Loading from "../Loading/Loading";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import useUser from "../../hooks/useUser";
import styles from "./UserList.module.css";

function UserList() {
  const { authUser } = useUser();

  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  async function fetchUsers() {
    try {
      const response = await fetch(
        "https://nc-news-backend-02ex.onrender.com/api/users"
      );
      const data = await response.json();
      if (data.msg) {
        throw new Error(data.msg);
      }

      setUsers(data.users);
    } catch (err) {
      console.log(err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  if (isLoading) {
    return <Loading>Loading...</Loading>;
  }

  if (error) {
    return <ErrorMessage>{error}</ErrorMessage>;
  }

  return (
    <section className={styles.grid}>
      {users &&
        users.map((user) => {
          const isLoggedIn = authUser.username === user.username;
          return (
            <UserCard key={user.username} user={user} isLoggedIn={isLoggedIn} />
          );
        })}
    </section>
  );
}

export default UserList;
