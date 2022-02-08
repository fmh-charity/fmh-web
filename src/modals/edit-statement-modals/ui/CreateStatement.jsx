import React, { useEffect } from "react";
import styles from "./styles.module.css";
import { useStyles, theme } from "./muiStyles";
import { Formik, Form, Field } from "formik";
import { FormikTextField } from "formik-material-fields";
import { Button, Dialog, FormControl, MenuItem } from "@material-ui/core";
import { DatePicker, TimePicker } from "formik-material-ui-pickers";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { ThemeProvider } from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";
import ru from "date-fns/locale/ru";
import useRepository from "../repository";
import useUsersRepository from "../../../users/repository";

import useUsersRepo from "../../../users/repository";

// const useStyles = makeStyles(() => ({
//   title: {
//     width: "100%",
//     marginBottom: "10px",
//   },
//   params: {
//     display: "flex",
//     justifyContent: "space-between",
//     marginBottom: "10px",
//   },
//   select: {
//     width: "200px",
//   },
//   date: {
//     width: "175px",
//   },
//   time: {
//     width: "161px",
//   },
//   description: {
//     width: "100%",
//   },
//   saveBtn: {
//     boxShadow: "none",
//     textTransform: "uppercase",
//     alignSelf: "center",
//     color: "#fff",
//     width: "120px",
//     height: "30px",
//     fontSize: "12px",
//     backgroundColor: "#01A19F",
//     "&:hover": {
//       backgroundColor: "#01A19F",
//     },
//   },
// }));

const CreateStatement = () => {
  const classes = useStyles();
  const [{ claimData, openEdit }, methods] = useRepository();
  const [{ users }, usersMethods] = useUsersRepository();

  useEffect(() => {
    usersMethods.getUsers();
  }, []);

  const onExecutorChange = () => {
    const name = document.getElementById("executorName").innerText;
    methods.editExecutorName(name);
  };

  return (
    <Dialog open={openEdit} onClose={methods.closeModal}>
      <Formik
        initialValues={{
          id: claimData.id,
          title: claimData.title,
          description: claimData.description,
          planExecuteDate: claimData.planExecuteDate,
          time: claimData.time,
          executorName: claimData.executorName,
          executorId: claimData.executorId,
        }}
        onSubmit={({ ...data }) => {
          methods.editClaimData(data);
        }}>
        {() => (
          <Form className={styles.body}>
            <ThemeProvider theme={theme}>
              <FormikTextField
                label="Тема"
                size="small"
                variant="outlined"
                name="title"
                value={claimData.title}
                className={`${classes.title} ${classes.root}`}
                inputProps={{ maxLength: 50 }}
                required
              />
              <div className={classes.params}>
                <FormControl>
                  <FormikTextField
                    label="Исполнитель"
                    size="small"
                    name="executorId"
                    variant="outlined"
                    id="executorName"
                    onChange={onExecutorChange}
                    className={`${classes.select} ${classes.root}`}
                    value={claimData.executorId}
                    select>
                    <MenuItem key={""} value="Не выбран" disabled>
                      Исполнитель
                    </MenuItem>
                    {users &&
                      users.map((user) => (
                        <MenuItem key={user.id} value={user.id}>
                          {user.lastName} {user.firstName[0]}. {user.middleName[0]}.
                        </MenuItem>
                      ))}
                  </FormikTextField>
                </FormControl>
                <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ru}>
                  <Field
                    component={DatePicker}
                    disablePast
                    label="Дата"
                    inputVariant="outlined"
                    size="small"
                    name="planExecuteDate"
                    format="yyyy-MM-dd"
                    value={claimData.planExecuteDate}
                    className={`${classes.date} ${classes.root}`}
                    onChange={methods.editDate}
                    required
                  />
                  <Field
                    component={TimePicker}
                    ampm={false}
                    format="HH:mm"
                    views={["hours", "minutes"]}
                    label="Время"
                    size="small"
                    inputVariant="outlined"
                    name="time"
                    value={claimData.time}
                    className={`${classes.time} ${classes.root}`}
                    onChange={methods.editDate}
                    required
                  />
                </MuiPickersUtilsProvider>
              </div>
              <FormikTextField
                label="Описание"
                size="small"
                variant="outlined"
                name="description"
                multiline={true}
                rows={3}
                value={claimData.description}
                className={`${classes.description} ${classes.root}`}
                required
              />
            </ThemeProvider>
            <div className={styles.btnBlock}>
              <Button className={classes.saveButton} variant="contained" type="submit">
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
