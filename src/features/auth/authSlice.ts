import { createSlice } from "@reduxjs/toolkit";
import { api } from "src/services/api/authApi";
import type { RootState } from "../../app/store";

const getLoginInitialState = () => {
  const storageAuthState = window.localStorage.getItem("authorization");
  const storageUserInfoState = window.localStorage.getItem("userInfo");
  const authStorage = storageAuthState
    ? JSON.parse(storageAuthState)
    : { accessToken: "", refreshToken: "" };
  const userInfo = storageUserInfoState
    ? JSON.parse(storageUserInfoState)
    : null;

  return { ...authStorage, userInfo };
};

const authSlice = createSlice({
  name: "auth",
  initialState: getLoginInitialState(),
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(api.endpoints.login.matchFulfilled, (state, { payload }) => {
        state.accessToken = payload.accessToken;
        state.refreshToken = payload.refreshToken;
      })
      .addMatcher(
        api.endpoints.userInfo.matchFulfilled,
        (state, { payload }) => {
          state.userInfo = payload;
        }
      );
  },
});

export default authSlice.reducer;

export const selectCurrentUser = (state: RootState) => state.auth.accessToken;
export const selectUserInfo = (state: RootState) => state.auth.userInfo;
