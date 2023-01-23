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
      const { dateFrom, dateTo, newsCategoryId } = payload.payload;
      state.dateFrom = dateFrom;
      state.dateTo = dateTo;
      state.newsCategoryId = newsCategoryId;
      console.log(dateFrom, dateTo);
    },
  },
});

export const { toggleSort, filterNews } = AppSlice.actions;
export const sortReducer = AppSlice.reducer;
