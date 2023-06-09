import { createSlice } from "@reduxjs/toolkit";

interface App {
  byAsc: boolean;
  dateFrom: string;
  dateTo: string;
  newsCategoryId: number;
}

const initialState: App = {
  byAsc: JSON.parse(localStorage.getItem("sortByAsc") || "false"),
  dateFrom: "",
  dateTo: "",
  newsCategoryId: 0,
};

const AppSlice = createSlice({
  initialState,
  name: "sort",
  reducers: {
    toggleSort: (state) => {
      const { byAsc } = state;
      state.byAsc = !byAsc;
      localStorage.setItem("sortByAsc", `${byAsc}`);
    },
    filterNews: (state, payload: any) => {
      const changeDateFormat = (formDate: string) => {
        const date = new Date(formDate);
        return (
          `${date.getMonth() + 1}/`.padStart(3, "0") +
          `${date.getDate()}/`.padStart(3, "0") +
          `${date.getFullYear()}`.slice(2, 4)
        );
      };
      const { dateFrom, dateTo, newsCategoryId } = payload.payload;
      if (dateFrom) state.dateFrom = changeDateFormat(dateFrom);
      if (dateTo) state.dateTo = changeDateFormat(dateTo);
      state.newsCategoryId = newsCategoryId;
    },
  },
});

export const { toggleSort, filterNews } = AppSlice.actions;
export const sortReducer = AppSlice.reducer;
