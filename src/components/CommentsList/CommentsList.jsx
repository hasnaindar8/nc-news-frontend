import Loading from "../Loading/Loading.jsx";
import Error from "../Error/Error.jsx";
import CommentCard from "../CommentCard/CommentCard.jsx";

function CommentsList({ comments, isLoading, isError, fetchComments }) {
  if (isLoading) {
    return <Loading>Loading...</Loading>;
  }

  if (isError) {
    return <Error>Something went wrong</Error>;
  }

  return (
    <>
      {comments.map((comment) => {
        return (
          <CommentCard
            key={comment.comment_id}
            comment={comment}
            fetchComments={fetchComments}
          />
        );
      })}
    </>
  );
}

export default CommentsList;
