import { User } from "@/app/interfaces";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

export interface UserSlice {
  user: User | null;
  username: string | null;
}

const initialState: UserSlice = {
  user: null,
  username: null,
};

// TODO: merge with zoo
export const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
    },
    setUsername: (state, action: PayloadAction<string | null>) => {
      state.username = action.payload;
    },
  },
});

export const { setUser, setUsername } = userSlice.actions;

export default userSlice.reducer;
