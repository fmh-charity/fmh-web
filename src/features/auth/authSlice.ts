import { createSlice } from "@reduxjs/toolkit";
import { useLocation } from "react-router-dom";
import { useAuth } from "src/hooks/useAuth";
import { api } from "src/services/api/authApi";
import type { RootState } from "../../app/store";

const getLoginInitialState = () => {
  const storageAuthState = window.localStorage.getItem("authorization");
  return storageAuthState
    ? JSON.parse(storageAuthState)
    : { accessToken: "", refreshToken: "" };
};

const authSlice = createSlice({
  name: "auth",
  initialState: getLoginInitialState(),
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      api.endpoints.login.matchFulfilled,
      (state, { payload }) => {
        state.accessToken = payload.accessToken;
        state.refreshToken = payload.refreshToken;
      }
    );
  },
});

export default authSlice.reducer;

export const selectCurrentUser = (state: RootState) => state.auth.accessToken;
