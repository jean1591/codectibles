import { ActivityType } from "./activity";

export interface Rank {
  rank: number | "🥇" | "🥈" | "🥉" | "?";
  username: string;
  xp: number;
}

export interface Follow {
  level: number;
  username: string;
  xp: number;
}

export interface FriendActivity {
  activityId: string;
  createdAt: string;
  details: string;
  type: ActivityType;
  username: string;
}

export interface Social {
  follows: Follow[];
  friendsActivity: FriendActivity[];
  leaderboard: Rank[];
}
