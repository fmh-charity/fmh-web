import { createSlice } from "@reduxjs/toolkit";

export interface NavbarState {
  menuActive: boolean;
}

const initialState: NavbarState = {
  menuActive: false,
};

export const navbarSlice = createSlice({
  name: "navbar",
  initialState,
  reducers: {
    toggle: (state: NavbarState) => {
      state.menuActive = !state.menuActive;
    },
  },
});

// Action creators are generated for each case reducer function
export const { toggle } = navbarSlice.actions;

export default navbarSlice.reducer;
