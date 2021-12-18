import React from 'react';
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
import { FormikTextField } from 'formik-material-fields';

import useRepository from '../repository';

import "./NewsWindow.css";

export const Filter = () => {
  const [{ filter }, methods] = useRepository();

  const handleChangeFilterEvent = (event) => {
    methods.editFilter({ newsCategoryId: event.target.value });
  };

  return (
      <Dialog open={!!filter} onClose={methods.closeFilter}>
        <DialogTitle id="form-dialog-title">
          <Typography variant="h5" component="h3" className="titleFilter">
            Фильтр новостей
          </Typography>
        </DialogTitle>

        <Formik
          initialValues={filter && {
            newsCategoryId: filter.newsCategoryId,
            createDate: filter.createDate,
          }}
          onSubmit={({ createDate }) => {
            if (createDate) methods.editFilter({ createDate: new Date(createDate) });
            methods.filterNews();
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
                    htmlFor="createDate"
                    id="createDate"
                    label="Дата публикации"
                    type="date"
                    name="createDate"
                    dateFormat="dd/MM/yyyy"
                    fullWidth
                    margin="normal"
                    defaultValue={filter ? filter.date : new Date()}
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
                  <Button className="buttonCancell" onClick={methods.closeFilter}>
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
  );
};

export default Filter;
