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
  badges: { icon: string; id: string }[];
  collectibles: { icon: string; id: string; quality: Quality }[];
  createdAt: string;
  id: string;
  isRelation: boolean;
  level: number;
  rank: number;
  username: string;
  xp: number;
}

export interface Social {
  follows: Follow[];
  friendsActivity: FriendActivity[];
  leaderboard: Rank[];
}

export enum FollowAction {
  ADD = "add",
  DELETE = "delete",
}
