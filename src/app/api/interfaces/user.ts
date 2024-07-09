import { Stat } from "./stats";

export interface User {
  authUserId: string;
  fetchedAt: string;
  id: string;
  level: number;
  prToClaim: number;
  token: string;
  username: string;
}

export interface UserWithRelations extends User {
  stats: Stat[];
}

export interface UserDb {
  authUserId: string;
  fetchedAt: string;
  id: string;
  level: number;
  prToClaim: number;
  token: string;
  username: string;
}

export enum RewardType {
  XP = "XP",
  COINS = "coins",
}

export interface Reward {
  type: RewardType;
  value: number;
}

export interface StatLegacy {
  id: Resource;
  nextmilestone: number;
  previousmilestone: number;
  reward: number;
  rewardType: RewardType;
  user: number;
}

export enum Resource {
  APPROVES = "approves",
  COMMENTS = "comments",
  PR = "pr",
  XP = "xp",
}
