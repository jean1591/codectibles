import { FormatedBadges, UserBadge } from "./badge";

import { Collectible } from "./collectible";
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
  badges: FormatedBadges;
  collectibles: Collectible[];
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

export interface UserDbWithRelations extends UserDb {
  badges: UserBadge[];
  collectibles: Collectible[];
  stats: Stat[];
}

export enum Resource {
  APPROVES = "approves",
  COMMENTS = "comments",
  PR = "pr",
  XP = "xp",
}
