import React from "react";
import { Button } from "@material-ui/core";
import { Formik, Form } from "formik";
import { FormikTextField } from "formik-material-fields";
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

const CreateCommentForm = ({ claimId, cancelComment }) => {
  const [{ commentData, error }, methods] = useRepository();

  return (
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
            />
            <div className={style.btnBlock}>
              <SaveButton variant="contained" type="submit">
                Сохранить
              </SaveButton>
              <Button
                onClick={cancelComment}
                className={style.btn}
                variant="outlined"
                type="button">
                Отмена
              </Button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default CreateCommentForm;
