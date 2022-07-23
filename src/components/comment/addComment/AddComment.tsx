import React, { useState } from "react";
import styles from "./AddComment.module.less";

const AddComment = ({
  addComment,
  changeVisible,
}: {
  addComment: (description: string) => Promise<boolean>;
  changeVisible: () => void;
}) => {
  const [description, setDescription] = useState("");

  const changeDescription = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };

  const submit = async () => {
    const result = await addComment(description);
    if (result) {
      changeVisible();
      setDescription("");
    } else {
      alert("AddComments submit something went wrong");
    }
  };

  return (
    <div className={styles.addcomment__container}>
      <textarea
        className={styles.addcomment__textarea}
        placeholder="Комментарий"
        onChange={changeDescription}
        value={description}
      />
      <div className={styles.addcomment__btn_container}>
        <button
          className={styles.addcomment__btn}
          type="button"
          onClick={submit}
        >
          Добавить коментарий
        </button>
        <button
          className={styles.addcomment__btn}
          type="button"
          onClick={changeVisible}
        >
          Отменить
        </button>
      </div>
    </div>
  );
};

export default AddComment;
