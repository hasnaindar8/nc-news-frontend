import { BiUpvote, BiDownvote } from "react-icons/bi";
import { useState } from "react";
import styles from "./VoteControls.module.css";

function VoteControls({ articleId, votes, setVotes }) {
  const [isError, setIsError] = useState(false);

  const handleClick = async (isUp) => {
    const incVote = isUp ? 1 : -1;
    setVotes((prev) => prev + incVote);
    try {
      const url = `https://nc-news-backend-02ex.onrender.com/api/articles/${articleId}`;
      const response = await fetch(url, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ inc_votes: incVote }),
      });

      const data = await response.json();
      if (data.msg) {
        throw new Error(data.msg);
      }
      setVotes(data.article.votes);
      setIsError(false);
    } catch (error) {
      console.log(error.message);
      setVotes((prev) => prev - incVote);
      setIsError(true);
    }
  };

  return (
    <div className={styles.voteWrapper}>
      <span className={styles.voteControls}>
        <button
          onClick={() => {
            handleClick(true);
          }}
        >
          <BiUpvote />
        </button>
        <span className="votes">{votes} votes</span>
        <button
          onClick={() => {
            handleClick(false);
          }}
        >
          <BiDownvote />
        </button>
      </span>
      {isError && (
        <p className={styles.voteError}>Something went wrong. Try again.</p>
      )}
    </div>
  );
}
export default VoteControls;
