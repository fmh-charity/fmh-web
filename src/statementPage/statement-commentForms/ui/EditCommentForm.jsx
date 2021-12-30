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

const EditCommentForm = ({ id, cancelEdit }) => {
  const [updateComment, setUpdateComment] = useState("");
  const [{ data, error }, methods] = useRepository();

  const handleChange = (e) => {
    setUpdateComment(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    methods.setComment(id, updateComment);
  };
  return (
    <>
      {error ? (
        <div>{error}</div>
      ) : (
        <form onSubmit={handleSubmit} className={style.form}>
          <div className={style.formContent}>
            <TextField
              label="Комментарий"
              size="small"
              variant="outlined"
              name="updateComment"
              onChange={handleChange}
            />
            <div className={style.btnBlock}>
              <SaveButton variant="contained" type="submit">
                Сохранить
              </SaveButton>
              <Button onClick={cancelEdit} className={style.btn} variant="outlined" type="button">
                Отмена
              </Button>
            </div>
          </div>
        </form>
      )}
    </>
  );
};

export default EditCommentForm;
