import React, { useState } from "react";
import styles from "./styles.module.css";
import editing_icon_light from "../assets/Icons/editing_icon_light.svg";
// import edit_icon from '../../../assets/images/edit_icon.svg';

import EditCommentForm from "../statement-commentForms/ui/EditCommentForm";

const StatementComment = () => {
  const [editComment, setEditComment] = useState(false);

  const toggleEdit = () => {
    setEditComment(!editComment);
  };

  return (
    <React.Fragment>
      <div className={styles.block_comment}>
        <p className={styles.text_comment}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus, quaerat?
        </p>
        <button className={styles.button} onClick={toggleEdit}>
          <img src={editing_icon_light} alt="" />
        </button>
      </div>
      <div className={styles.cretor}>
        <p className={styles.text}>А. И. Серова</p>
        <p className={styles.text}>
          07.12.2021 <span className={styles.time}>19:30</span>
        </p>
      </div>
      {editComment && <EditCommentForm cancelEdit={toggleEdit} />}
    </React.Fragment>
  );
};
export default StatementComment;
