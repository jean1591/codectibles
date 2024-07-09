import { ConventionalCommitType } from "./github";

export interface Badge {
  description: string;
  icon: string;
  id: string;
  reward: number;
  threshold: number;
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
