import React from "react";
import { useGetClaimCommentsQuery } from "src/services/api/claimsApi";
import styles from "./ClaimComment.module.less";

export interface IClaimComment {
  id: number;
  claimId: number;
  createDate: number;
  creatorId: number;
  creatorName: string;
  description: string;
}

const ClaimComments = ({ claimId }: { claimId: number }) => {
  const { data: comments } = useGetClaimCommentsQuery("" + claimId);

  return comments ? (
    <>
      {comments?.map((comment) => (
        <CommentCard comment={comment} />
      ))}
    </>
  ) : (
    <h1>Nothing</h1>
  );
};

const CommentCard = ({ comment }: { comment: IClaimComment }) => (
  <div className={styles.comment_card__container}>
    <div>{comment.description}</div>
    <div>
      {comment.creatorName}
      {comment.createDate}
    </div>
  </div>
);

export default ClaimComments;
