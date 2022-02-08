import React from "react";
import { Button, Dialog } from "@material-ui/core";
import { Formik, Form } from "formik";
import { FormikTextField } from "formik-material-fields";
import { withStyles } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";

import useRepository from "../repository";
import style from "./form.module.css";

const useStyles = makeStyles(() => ({
  root: {
    "& .MuiFormLabel-root.Mui-focused": {
      color: "#01a19f",
    },
    "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: "#01a19f",
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#01a19f",
    },
  },
  saveButton: {
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
}));

const CreateCommentForm = ({ claimId }) => {
  const [{ commentData, openEdit }, methods] = useRepository();
  const classes = useStyles();

  return (
    <Dialog open={openEdit} onClose={methods.closeCommentModal}>
      <Formik
        initialValues={{
          id: commentData.id,
          description: commentData.description,
        }}
        onSubmit={({ ...data }) => {
          methods.editComment(data, claimId);
        }}>
        {() => (
          <Form className={style.form}>
            <div className={style.formContent}>
              <FormikTextField
                label="Комментарий"
                size="small"
                variant="outlined"
                name="description"
                className={classes.root}
              />
              <div className={style.btnBlock}>
                <Button className={classes.saveButton} variant="contained" type="submit">
                  Сохранить
                </Button>
                <Button
                  onClick={methods.closeCommentModal}
                  className={style.closeBtn}
                  variant="outlined"
                  type="button">
                  Отмена
                </Button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
};

export default CreateCommentForm;
