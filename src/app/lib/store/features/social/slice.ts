import {
  Follow,
  FriendActivity,
  Rank,
  UserProfile,
} from "@/app/api/interfaces/social";

import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

export interface SocialSlice {
  follows: Follow[] | null;
  friendsActivity: FriendActivity[] | null;
  leaderboard: Rank[] | null;
  profile: UserProfile | null;
}

const initialState: SocialSlice = {
  follows: null,
  friendsActivity: null,
  leaderboard: null,
  profile: null,
};

export const socialSlice = createSlice({
  name: "socialSlice",
  initialState,
  reducers: {
    setFollows: (state, action: PayloadAction<Follow[]>) => {
      state.follows = action.payload;
    },
    setFriendsActivity: (state, action: PayloadAction<FriendActivity[]>) => {
      state.friendsActivity = action.payload;
    },
    setLeaderboard: (state, action: PayloadAction<Rank[]>) => {
      state.leaderboard = action.payload;
    },
    setProfile: (state, action: PayloadAction<UserProfile>) => {
      state.profile = action.payload;
    },
  },
});

export const { setFollows, setFriendsActivity, setLeaderboard, setProfile } =
  socialSlice.actions;

export default socialSlice.reducer;
