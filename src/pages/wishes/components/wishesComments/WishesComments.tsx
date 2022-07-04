import { format } from "date-fns";
import React from "react";
import { useGetWishesCommentsQuery } from "src/services/api/wishesApi";
import styles from "./WishesComment.module.less";

export interface IWishesComment {
  id: number;
  wishesId: number;
  createDate: number;
  creatorId: number;
  creatorName: string;
  description: string;
}

const WishesComments = ({ wishesId }: { wishesId: number }) => {
  const { data: comments } = useGetWishesCommentsQuery(wishesId.toString());

  return comments ? (
    <div>
      {comments?.map((comment: IWishesComment) => (
        <CommentCard key={comment.id} comment={comment} />
      ))}
    </div>
  ) : (
    <h1>Nothing</h1>
  );
};

const CommentCard = ({ comment }: { comment: IWishesComment }) => (
  <div className={styles.comment_card__container}>
    <div
      title={comment.description}
      className={styles.comment_card__description}
    >
      {comment.description}
    </div>
    <div className={styles.comment_card__row}>
      <span>{comment.creatorName}</span>
      <span>{format(comment.createDate, "dd.MM.yyyy")}</span>
    </div>
  </div>
);

export default WishesComments;
