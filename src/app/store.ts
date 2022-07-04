import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import navbarReducer from "src/features/navbar/navbarSlice";
import { api } from "src/services/api/authApi";
import { claimsApi } from "src/services/api/claimsApi";
import { newsApi } from "src/services/api/newsApi";
import authReducer from "src/features/auth/authSlice";
import { usersApi } from "src/services/api/usersApi";
import { wishesApi } from "src/services/api/wishesApi";

export const store = configureStore({
  reducer: {
    navbar: navbarReducer,
    [newsApi.reducerPath]: newsApi.reducer,
    [claimsApi.reducerPath]: claimsApi.reducer,
    [wishesApi.reducerPath]: wishesApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
    [api.reducerPath]: api.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      newsApi.middleware,
      claimsApi.middleware,
      wishesApi.middleware,
      usersApi.middleware,
      api.middleware
    ),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
