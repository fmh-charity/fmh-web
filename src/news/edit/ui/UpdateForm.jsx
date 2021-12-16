import React from 'react';
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

export const UpdateForm = () => {
  const [repo, methods] = useRepository();

  return (
      <Dialog
        open={state.openDialogRedux}
        maxWidth="none"
        className="reduxDialog"
        BackdropProps={{
          className: "backgroundDialog",
        }}
        PaperProps={{
          className: "createAndReduxDialog",
        }}
        onClose={closeDialogRedux}>
        <DialogTitle>
          <Typography
            variant="h5"
            component="h3"
            id="titleNews"
            className="createAndReduxTitleNews">
            Редактировать новость
          </Typography>
        </DialogTitle>
        <Formik
          enableReinitialize={true}
          initialValues={{
            title: this.state.reduxTitleNews,
            text: this.state.reduxReportNews,
            date: this.state.reduxPublicDate, //format like: '1967-12-20'
            time: this.state.reduxPublishTime,
          }}
          onSubmit={({ title, text, date, time }, { setStatus, setSubmitting }) => {
            let idNews = this.state.reduxIdNews;
            let eventId = this.state.reduxIdNewsEvent;
            let show = this.state.reduxPublishEnabled;
            let dateTime = new Date(date + " " + time);
            var longFormatDatePublic = new Date(dateTime) * 1; // date to long
            var longFormatDateCreate = new Date() * 1;
            // BackDataService.updateNews(
            //   idNews,
            //   title,
            //   eventId,
            //   text,
            //   longFormatDatePublic,
            //   show,
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
                    name="newsCategoryId"
                    className="createAndReduxSelectCategory"
                    defaultValue={this.state.reduxCategoryId}
                    margin="normal"
                    variant="outlined"
                    type="text"
                    // value={this.state.reduxCategoryId}
                    onChange={this.handleChangeEvent}>
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
                  defaultValue={this.state.curDate}
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
                  defaultValue={this.state.reduxTitleNews}
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
                  defaultValue={this.state.reduxReportNews}
                  type="text"
                />
              </div>
              <div className="createAndReduxDivCheck">
                Публикация:{" "}
                <ColorSwitch
                  checked={this.state.reduxPublishEnabled}
                  onChange={this.reduxCheckValue}
                />
              </div>
              <DialogActions>
                <div className="createAndReduxDivActions">
                  <Button className="buttonCancell" onClick={this.handleCloseDialogRedux}>
                    Отмена
                  </Button>
                  <Button
                    className="buttonConfirm"
                    onClick={methods.handleCloseDialogRedux}
                    type="submit"
                    active={{
                      background: "#20B2AA",
                    }}
                    isSubmitting={repo.isSubmitting}>
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
