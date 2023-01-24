import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { api } from "src/services/api/authApi";
import { claimsApi } from "src/services/api/claimsApi";
import { newsApi } from "src/services/api/newsApi";
import authReducer from "src/features/auth/authSlice";
import { usersApi } from "src/services/api/usersApi";
import { wishesApi } from "src/services/api/wishesApi";
import { patientApi } from "src/services/api/patientApi";
import { sortReducer } from "src/features/sort/appSlice";

export const store = configureStore({
  reducer: {
    [newsApi.reducerPath]: newsApi.reducer,
    [claimsApi.reducerPath]: claimsApi.reducer,
    [wishesApi.reducerPath]: wishesApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
    [patientApi.reducerPath]: patientApi.reducer,
    [api.reducerPath]: api.reducer,
    auth: authReducer,
    sort: sortReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      newsApi.middleware,
      claimsApi.middleware,
      wishesApi.middleware,
      usersApi.middleware,
      patientApi.middleware,
      api.middleware
    ),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
