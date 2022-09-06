import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { api, UserResponse } from "src/services/api/authApi";
import type { RootState } from "src/app/store";

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
  reducers: {
    tokenReceived: (
      state: UserResponse,
      {
        payload: { accessToken, refreshToken },
      }: PayloadAction<{ accessToken: string; refreshToken: string }>
    ) => {
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
    },
    loggedOut: (state: any) => {
      Object.assign(state, getLoginInitialState());
    },
  },
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
export const { tokenReceived, loggedOut } = authSlice.actions;
