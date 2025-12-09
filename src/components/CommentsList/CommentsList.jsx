import Loading from "../Loading/Loading.jsx";
import ErrorMessage from "../ErrorMessage/ErrorMessage.jsx";
import CommentCard from "../CommentCard/CommentCard.jsx";
import useUser from "../../hooks/useUser.js";

function CommentsList({ comments, isLoading, isError, fetchComments }) {
  const { authUser } = useUser();

  if (isLoading) {
    return <Loading>Loading...</Loading>;
  }

  if (isError) {
    return <ErrorMessage>Something went wrong</ErrorMessage>;
  }

  return (
    <>
      {comments.map((comment) => {
        return (
          <CommentCard
            key={comment.comment_id}
            comment={comment}
            fetchComments={fetchComments}
            user={authUser}
          />
        );
      })}
    </>
  );
}

export default CommentsList;
