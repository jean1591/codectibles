import { ActivityType } from "./activity";
import { Quality } from "./collectible";

export interface Rank {
  rank: number | "🥇" | "🥈" | "🥉" | "?";
  username: string;
  xp: number;
}

export interface Follow {
  id: string;
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

export interface UserProfile {
  username: string;
  level: number;
  createdAt: string;
  badges: string[];
  collectibles: { icon: string; quality: Quality }[];
  xp: number;
}

export interface Social {
  follows: Follow[];
  friendsActivity: FriendActivity[];
  leaderboard: Rank[];
}
