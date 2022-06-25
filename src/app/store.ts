import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import navbarReducer from "src/features/navbar/navbarSlice";
import { api } from "src/services/api/authApi";
import { claimsApi } from "src/services/api/claimsApi";
import { newsApi } from "src/services/api/newsApi";
import authReducer from "src/features/auth/authSlice";

export const store = configureStore({
  reducer: {
    navbar: navbarReducer,
    [newsApi.reducerPath]: newsApi.reducer,
    [claimsApi.reducerPath]: claimsApi.reducer,
    [api.reducerPath]: api.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      newsApi.middleware,
      claimsApi.middleware,
      api.middleware
    ),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
