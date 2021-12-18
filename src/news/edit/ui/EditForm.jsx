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

import useRepository from '../repository';

import './edit-form.module.css';

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

export const EditForm = () => {
  const [repo,  methods] = useRepository();

  const handleChangeEvent = (event) => {
    methods.editRecord({ newsCategoryId: event.target.value });
  };

  const createCheckValue = (event) => {
    methods.editRecord({ publishEnabled: event.target.checked });
  };

  return (
      <Dialog
        open={repo.openEdit}
        maxWidth="none"
        PaperProps={{
          className: "createAndReduxDialog",
        }}
        onClose={methods.closeModal}>
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
            title: repo.record.title,
            description: repo.record.description,
            newsCategoryId: repo.record.newsCategoryId,
            createDate: repo.record.createDate,
            time: repo.record.time,
          }}
          onSubmit={({ newsCategoryId, ...data }) => methods.editRecord(data)}>
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
                    value={repo.record.newsCategoryId}
                    onChange={handleChangeEvent}
                    margin="normal"
                    variant="outlined"
                    type="text"
                  >
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
                  htmlFor="createDate"
                  id="createDate"
                  label="Дата"
                  type="date"
                  name="createDate"
                  dateFormat="dd/MM/yyyy"
                  fullWidth
                  margin="normal"
                  value={repo.record.createDate}
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
                  value={repo.record.title}
                  className="createAndReduxTitle"
                  type="text"
                />
                <FormikTextField
                  htmlFor="description"
                  label="Сообщение"
                  id="description"
                  name="description"
                  margin="normal"
                  variant="outlined"
                  multiline={true}
                  rows={5}
                  maxRows={8}
                  className="createAndReduxRepot"
                  value={repo.record.description}
                  type="text"
                />
              </div>
              <div className="createAndReduxDivCheck">
                Публикация:{" "}
                <ColorSwitch checked={repo.record.publishEnabled} onChange={createCheckValue} />
              </div>
              <DialogActions>
                <div className="createAndReduxDivActions">
                  <Button className="buttonCancell" onClick={methods.closeModal}>
                    Отмена
                  </Button>
                  <Button
                    className="buttonConfirm"
                    onClick={methods.closeModal}
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
