import { Activity } from "@/app/api/interfaces/activity";
import { User } from "@/app/api/interfaces/user";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

export interface UserSlice {
  activities: Activity[] | null
  user: User | null
}

const initialState: UserSlice = {
  activities: null,
  user: null,
};

export const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    addActivity: (state, action: PayloadAction<Activity>) => {
      if (state.activities) {
        state.activities = [action.payload, ...state.activities];
      } else {
        state.activities = [action.payload]
      }
    },
    setActivities: (state, action: PayloadAction<Activity[] | null>) => {
      state.activities = action.payload;
    },
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
    },
  },
});

export const { addActivity, setActivities, setUser } = userSlice.actions;

export default userSlice.reducer;
