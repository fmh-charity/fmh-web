import React, { useState } from 'react';
import Dialog from "@material-ui/core/Dialog";
import Typography from "@material-ui/core/Typography";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Formik, Form } from "formik";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import { FormikTextField } from "formik-material-fields";
import "./NewsWindow.css";

export const Filter = () => {
  const [state, setState] = useState({
    curDate: new Date(),
    openFilter: false,
  });

  const handleChangeFilterEvent = (event) => {
    this.setState({ filterEvent: event.target.value });
  };
  const filterSubmited = (date) => {
    this.setState({ ...state, openFilter: false });
    this.setState({ ...state, filteredDate: date });
    this.setState({ ...state, filterDone: true });
  };
  const handleClickCloseFilter = () => {
    this.setState({ openFilter: false });
  };

  return (
      <Dialog open={state.openFilter} onClose={handleClickCloseFilter}>
        <DialogTitle id="form-dialog-title">
          <Typography variant="h5" component="h3" className="titleFilter">
            Фильтр новостей
          </Typography>
        </DialogTitle>

        <Formik
          initialValues={{
            newsCategoryId: "",
            date: "",
          }}
          onSubmit={({ date }) => {
            var numberFilteredDate = new Date(date) * 1; // date to long
            filterSubmited(numberFilteredDate);
          }}>
          {({ isSubmitting }) => (
            <Form>
              <div className="divFilter">
                <FormControl sx={{ m: 1, minWidth: 420 }}>
                  <InputLabel id="demo-simple-select-helper-label">Событие</InputLabel>
                  <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    htmlFor="newsCategoryId"
                    // placeholder={setEventRedux}
                    className="selectEvent"
                    name="newsCategoryId"
                    margin="normal"
                    variant="outlined"
                    type="text"
                    // value={setEventRedux}
                    onChange={handleChangeFilterEvent}>
                    <MenuItem value={1}>Объявление</MenuItem>
                    <MenuItem value={2}>День рождение</MenuItem>
                    <MenuItem value={3}>Зарплата</MenuItem>
                    <MenuItem value={4}>Профсоюз</MenuItem>
                    <MenuItem value={5}>Праздник</MenuItem>
                    <MenuItem value={6}>Массаж</MenuItem>
                    <MenuItem value={7}>Благодарность</MenuItem>
                    <MenuItem value={8}>Нужна помощь</MenuItem>
                  </Select>

                  <FormikTextField
                    htmlFor="date"
                    id="date"
                    label="Дата публикации"
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
                </FormControl>
              </div>

              <DialogActions>
                <div className="createAndReduxDivActions">
                  <Button className="buttonCancell" onClick={handleClickCloseFilter}>
                    Отмена
                  </Button>
                  <Button
                    className="buttonConfirm"
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
  )
};

export default Filter;
