import { configureStore } from '@reduxjs/toolkit';
import Movieslice from "./MovieSlice"

export const store = configureStore({
  reducer: {
    movie:Movieslice
  },
});
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>

