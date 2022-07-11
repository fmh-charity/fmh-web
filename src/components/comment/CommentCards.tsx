import { format } from "date-fns";
import React from "react";
import { useGetClaimCommentsQuery } from "src/services/api/claimsApi";
import styles from "./CommentCard.module.less";

export interface IComment {
  id: number;
  objId: number;
  createDate: number;
  creatorId: number;
  creatorName: string;
  description: string;
}

const CommentCard = ({ comment }: { comment: IComment }) => (
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

export default CommentCard;
