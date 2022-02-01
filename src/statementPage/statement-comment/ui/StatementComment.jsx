import React, { useEffect } from "react";
import format from "date-fns/format";
import fromUnixTime from "date-fns/fromUnixTime";
import styles from "./styles.module.css";
import { ReactComponent as EditIcon } from "../../../assets/Icons/editing_icon_light.svg";

import useRepository from "../repository";
import useEditCommentRepository from "../../statement-comment-form/repository";

const StatementComment = ({ claimId }) => {
  const [{ comments }, methods] = useRepository();
  const [, editCommentMethods] = useEditCommentRepository();

  useEffect(() => {
    methods.getComments(claimId);
  }, []);

  return (
    comments &&
    comments.map((comment) => (
      <div key={comment.id}>
        <div className={styles.block_comment}>
          <p className={styles.text_comment}>{comment.description}</p>
          <button
            className={styles.edit_button}
            onClick={() => editCommentMethods.openCommentModal(comment)}>
            <EditIcon />
          </button>
        </div>
        <div className={styles.creator}>
          <p className={styles.text}>{`${comment.creatorName.split(" ")[0]} ${
            comment.creatorName.split(" ")[1][0]
          }. ${comment.creatorName.split(" ")[2][0]}.`}</p>
          <p className={styles.text}>
            {comment.createDate && format(fromUnixTime(comment.createDate), "dd.MM.yyyy")}
            <span className={styles.time}>
              {comment.createDate && format(fromUnixTime(comment.createDate), "HH:mm")}
            </span>
          </p>
        </div>
      </div>
    ))
  );
};
export default StatementComment;
