import React, { useEffect } from "react";
import styles from "./styles.module.css";
import { makeStyles } from "@material-ui/core/styles";
import { Formik, Form } from "formik";
import { FormikTextField } from "formik-material-fields";
import { Button, Dialog, MenuItem } from "@material-ui/core";
import useRepository from "../repository";
import useUsersRepo from "../../../users/repository";

const useStyles = makeStyles(() => ({
  title: {
    width: "100%",
    marginBottom: "10px",
  },
  params: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "10px",
  },
  select: {
    width: "200px",
  },
  date: {
    width: "175px",
  },
  time: {
    width: "161px",
  },
  description: {
    width: "100%",
  },
  saveBtn: {
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

const CreateStatement = () => {
  const classes = useStyles();
  const [repo, methods] = useRepository();
  const [{ users }, usersMethods] = useUsersRepo();

  useEffect(() => {
    const users = usersMethods.getUsers();
    console.log("users", users);
  }, []);

  return (
    <Dialog open={repo.openEdit} onClose={methods.closeModal}>
      <Formik
        initialValues={{
          id: repo.claimData.id,
          title: repo.claimData.title,
          description: repo.claimData.description,
          planExecuteDate: repo.claimData.planExecuteDate,
          time: repo.claimData.time,
          executorName: repo.claimData.executorName,
        }}
        onSubmit={({ ...data }) => {
          methods.editClaimData(data);
        }}>
        {(isSubmitting) => (
          <Form className={styles.body}>
            <FormikTextField
              label="Тема"
              size="small"
              variant="outlined"
              name="title"
              value={repo.claimData.title}
              className={classes.title}
              required
            />
            <div className={classes.params}>
              <FormikTextField
                label="Исполнитель"
                size="small"
                variant="outlined"
                name="executorName"
                className={classes.select}
                select
                required>
                {users &&
                  users.map((user) => (
                    <MenuItem
                      key={user.id}
                      value={`${user.lastName} ${user.firstName[0]}. ${user.middleName[0]}.`}>
                      {user.lastName} {user.firstName[0]}. {user.middleName[0]}.
                    </MenuItem>
                  ))}
              </FormikTextField>
              <FormikTextField
                label="Дата"
                type="date"
                size="small"
                name="planExecuteDate"
                variant="outlined"
                value={repo.claimData.planExecuteDate}
                className={classes.date}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <FormikTextField
                label="Время"
                size="small"
                name="time"
                type="time"
                variant="outlined"
                value={repo.claimData.time}
                className={classes.time}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div>
            <FormikTextField
              label="Описание"
              size="small"
              variant="outlined"
              name="description"
              multiline={true}
              rows={3}
              value={repo.claimData.description}
              className={classes.description}
              required
            />
            <div className={styles.btnBlock}>
              <Button
                isSubmitting={isSubmitting}
                className={classes.saveBtn}
                variant="contained"
                type="submit">
                Сохранить
              </Button>
              <Button
                className={styles.closeBtn}
                variant="outlined"
                type="button"
                onClick={methods.closeModal}>
                Отмена
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
};

export default CreateStatement;
