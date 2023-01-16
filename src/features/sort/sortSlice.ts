import { createSlice } from "@reduxjs/toolkit";

interface Sort {
  byAsc: boolean;
}

const initialState: Sort = {
  byAsc: JSON.parse(localStorage.getItem("sortByAsc") || "false"),
};

const sortSlice = createSlice({
  initialState,
  name: "sort",
  reducers: {
    toggleSort: (state) => {
      const { byAsc } = state;
      state.byAsc = !byAsc;
      localStorage.setItem("sortByAsc", `${byAsc}`);
    },
  },
});

export const { toggleSort } = sortSlice.actions;
export const sortReducer = sortSlice.reducer;
