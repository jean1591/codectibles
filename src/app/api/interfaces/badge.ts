import { ConventionalCommitType } from "./github";

export interface Badge {
  condition: (params?: any) => boolean;
  description: string;
  icon: string;
  id: string;
  reward: number;
  title: string;
  type: ConventionalCommitType;
}

export interface UserBadge extends Badge {
  unlockedAt: string;
}

export interface FormatedBadges {
  claimed: UserBadge[];
  locked: Badge[];
  unlocked: Badge[];
}

export interface DbBadge extends UserBadge {
  userId: string;
}

export type PrCountType = Record<ConventionalCommitType, number>;
