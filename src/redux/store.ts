import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import fakeStoreReducer from "./fakeStoreSlice";
import { fakeStoreApi } from "./fakeStoreApiSlice";

export const store = configureStore({
  reducer: {
    fakeStore: fakeStoreReducer,
    [fakeStoreApi.reducerPath]: fakeStoreApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(fakeStoreApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
