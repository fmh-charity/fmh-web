import React, { useState } from 'react';
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Formik, Form } from "formik";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Switch from "@material-ui/core//Switch";
import { withStyles } from "@material-ui/core/styles";
import { TimePicker } from "formik-material-ui-pickers";
import { FormikTextField } from "formik-material-fields";

import './create-form.module.css';

const ColorSwitch = withStyles({
  switchBase: {
    color: "#20B2AA",
    "&$checked": {
      color: "#20B2AA",
    },
    "&$checked + $track": {
      backgroundColor: "#20B2AA",
    },
  },
  checked: {},
  track: {},
})(Switch);

export const CreateForm = () => {
  const [state, setState] = useState({
    openCreate: false,
    curDate: new Date(),
    reduxIdNewsEvent: 0,
    checked: false,
    reduxCategoryId: "",
    reduxTitleNews: "",
  });

  const handleCloseCreate = () => {
    this.setState({ ...state, openCreate: false });
  };

  const handleChangeEvent = (event) => {
    this.setState({ ...state, reduxIdNewsEvent: event.target.value });
  };

  const createCheckValue = (event) => {
    this.setState({ ...state, checked: event.target.checked });
  };

  return (
      <Dialog
        open={state.openCreate}
        maxWidth="none"
        PaperProps={{
          className: "createAndReduxDialog",
        }}
        onClose={handleCloseCreate}>
        <DialogTitle>
          <Typography
            variant="h5"
            component="h3"
            id="titleNews"
            className="createAndReduxTitleNews">
            Создать новость
          </Typography>
        </DialogTitle>
        <Formik
          initialValues={{
            title: "",
            text: "",
            newsCategoryId: "",
            date: state.curDate,
            time: "",
          }}
          onSubmit={({ title, text, date, time }) => {
            let eventId = state.reduxIdNewsEvent;
            let isShow = state.checked;
            let dateTime = new Date(date + " " + time);
            var longFormatDatePublic = new Date(dateTime) * 1; // date to long
            var longFormatDateCreate = new Date() * 1;
            // BackDataService.createNews(
            //   title,
            //   eventId,
            //   text,
            //   isShow,
            //   longFormatDatePublic,
            //   longFormatDateCreate,
            // );
          }}>
          {({ isSubmitting }) => (
            <Form>
              <div className="createAndReduxSelectForm">
                <FormControl sx={{ m: 1 }}>
                  <InputLabel className="createAndReduxEnentNews">Событие</InputLabel>
                  <Select
                    id="demo-simple-select-helper"
                    htmlFor="newsCategoryId"
                    label="qwerty"
                    className="createAndReduxSelectCategory"
                    name="newsCategoryId"
                    defaultValue={state.reduxCategoryId}
                    margin="normal"
                    variant="outlined"
                    type="text"
                    onChange={handleChangeEvent}>
                    <MenuItem value={1}>Объявление</MenuItem>
                    <MenuItem value={2}>День рождение</MenuItem>
                    <MenuItem value={3}>Зарплата</MenuItem>
                    <MenuItem value={4}>Профсоюз</MenuItem>
                    <MenuItem value={5}>Праздник</MenuItem>
                    <MenuItem value={6}>Массаж</MenuItem>
                    <MenuItem value={7}>Благодарность</MenuItem>
                    <MenuItem value={8}>Нужна помощь</MenuItem>
                  </Select>
                </FormControl>
                <FormikTextField
                  htmlFor="date"
                  id="date"
                  label="Дата"
                  type="date"
                  name="date"
                  dateFormat="dd/MM/yyyy"
                  fullWidth
                  margin="normal"
                  defaultValue={state.curDate}
                  variant="outlined"
                  className="createAndReduxSelectDateAndTime"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <FormikTextField
                  component={TimePicker}
                  id="time"
                  label="Время"
                  type="time"
                  name="time"
                  className="createAndReduxSelectDateAndTime"
                  defaultValue="00:00"
                  margin="normal"
                  variant="outlined"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </div>
              <div className="createAndReduxDivReport">
                <FormikTextField
                  htmlFor="title"
                  label="Заголовок"
                  name="title"
                  margin="normal"
                  variant="outlined"
                  defaultValue={state.reduxTitleNews}
                  className="createAndReduxTitle"
                  type="text"
                />
                <FormikTextField
                  htmlFor="text"
                  label="Сообщение"
                  name="text"
                  margin="normal"
                  variant="outlined"
                  multiline={true}
                  rows={5}
                  maxRows={8}
                  className="createAndReduxRepot"
                  defaultValue={state.reduxReportNews}
                  type="text"
                />
              </div>
              <div className="createAndReduxDivCheck">
                Публикация:{" "}
                <ColorSwitch checked={state.checked} onChange={createCheckValue} />
              </div>
              <DialogActions>
                <div className="createAndReduxDivActions">
                  <Button className="buttonCancell" onClick={handleCloseCreate}>
                    Отмена
                  </Button>
                  <Button
                    className="buttonConfirm"
                    onClick={handleCloseCreate}
                    type="submit"
                    active={{
                      background: "#20B2AA",
                    }}
                    isSubmitting={isSubmitting}>
                    Сохранить
                  </Button>
                </div>
              </DialogActions>
            </Form>
          )}
        </Formik>
      </Dialog>
  );
};
