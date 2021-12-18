import React, { useState } from "react";
import { TextField, Button } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

import useRepository from "../repository";
import style from "./form.module.css";

const SaveButton = withStyles(() => ({
  root: {
    boxShadow: "none",
    textTransform: "uppercase",
    alignSelf: "center",
    color: "#fff",
    width: "120px",
    height: "30px",
    fontSize: "12px",
    backgroundColor: "#01A19F",
    "&:hover": {
      backgroundColor: "#01A19F",
    },
  },
}))(Button);

const CreateCommentForm = ({ id, cancelComment }) => {
  const [comment, setComment] = useState("");
  const [{ data, error }, methods] = useRepository();

  const handleChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    methods.setComment(id, comment);
  };

  return (
    <form onSubmit={handleSubmit} className={style.createForm}>
      <div className={style.formContent}>
        <TextField
          label="Комментарий"
          size="small"
          variant="outlined"
          name="comment"
          onChange={handleChange}
          value={comment}
        />
        <div className={style.btnBlock}>
          <SaveButton variant="contained" type="submit">
            Сохранить
          </SaveButton>
          <Button onClick={cancelComment} className={style.btn} variant="outlined" type="button">
            Отмена
          </Button>
        </div>
      </div>
    </form>
  );
};

export default CreateCommentForm;
