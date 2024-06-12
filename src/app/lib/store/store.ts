import { configureStore } from "@reduxjs/toolkit";
import kingdomReducer from "./features/kingdom/slice";
import prizeReducer from "./features/prize/slice";

export const store = configureStore({
  reducer: {
    kingdom: kingdomReducer,
    prize: prizeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
