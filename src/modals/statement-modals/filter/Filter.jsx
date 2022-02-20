import React from "react";
import { Formik, Form } from "formik";
import { Button, Checkbox, Dialog, DialogTitle, FormControlLabel } from "@material-ui/core";
import useRepository from "../../../statementPage/repository";
import { useStyles } from "./muiStyles.js";
import styles from "./filter.module.css";

const Filter = () => {
  const classes = useStyles();
  const [{ openFilterModal, filterBy }, methods] = useRepository();

  const { OPEN, IN_PROGRESS, EXECUTED, CANCELLED } = filterBy;

  const handleChangeFilterEvent = (event) => {
    methods.editFilter({ ...filterBy, [event.target.name]: event.target.checked });
  };

  return (
    <Dialog open={openFilterModal} onClose={methods.closeFilterModal}>
      <DialogTitle className={styles.title}>Фильтрация</DialogTitle>
      <Formik
        initialValues={{
          OPEN: OPEN,
          IN_PROGRESS: IN_PROGRESS,
          EXECUTED: EXECUTED,
          CANCELLED: CANCELLED,
        }}
        onSubmit={() => {
          methods.getFilteredClaims();
        }}>
        {() => (
          <Form className={styles.filter}>
            <FormControlLabel
              control={
                <Checkbox
                  className={classes.checkbox}
                  onChange={handleChangeFilterEvent}
                  checked={OPEN}
                  name="OPEN"
                />
              }
              label="Открыта"
            />
            <FormControlLabel
              control={
                <Checkbox
                  className={classes.checkbox}
                  onChange={handleChangeFilterEvent}
                  checked={IN_PROGRESS}
                  name="IN_PROGRESS"
                />
              }
              label="В работе"
            />
            <FormControlLabel
              control={
                <Checkbox
                  className={classes.checkbox}
                  onChange={handleChangeFilterEvent}
                  checked={EXECUTED}
                  name="EXECUTED"
                />
              }
              label="Выполнена"
            />
            <FormControlLabel
              control={
                <Checkbox
                  className={classes.checkbox}
                  onChange={handleChangeFilterEvent}
                  checked={CANCELLED}
                  name="CANCELLED"
                />
              }
              label="Отмененные"
            />

            <div className={styles.btnBlock}>
              <Button variant="outlined" className={classes.saveButton} type="submit">
                OK
              </Button>
              <Button
                variant="outlined"
                className={styles.closeBtn}
                onClick={methods.closeFilterModal}>
                Отмена
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
};

export default Filter;
