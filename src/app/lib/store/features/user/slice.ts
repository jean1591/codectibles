import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

export interface UserSlice {
  username: string | null;
}

const initialState: UserSlice = {
  username: null,
};

// TODO: merge with zoo
export const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    setUsername: (state, action: PayloadAction<string | null>) => {
      state.username = action.payload;
    },
  },
});

export const { setUsername } = userSlice.actions;

export default userSlice.reducer;
