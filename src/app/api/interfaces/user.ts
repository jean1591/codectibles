import { ConventionalCommitType } from "./pr";

export type User = Omit<UserDb, 'badges'> & {
    badges: {
        unlocked: Badge[];
        locked: Badge[];
    }
}

export interface UserDb {
    authUserId: string,
    badges: Badge[];
    fetchedAt: string,
    id: string;
    level: number;
    stats: Stats;
    token: string;
    username: string;
}

export interface Badge {
    description: string;
    icon: string;
    id: string;
    reward: number;
    rewardType: RewardType;
    threshold: number;
    title: string;
    type: ConventionalCommitType;
    unlocked: boolean;
    unlockedAt: string | null;
}

export enum RewardType {
    XP = "XP",
    COINS = "coins"
}

export interface Reward {
    type: RewardType;
    value: number;
}

export interface Stats {
    approves: Stat;
    comments: Stat;
    pr: Stat;
    xp: Stat;
}

export interface Stat {
    id: Resource;
    nextmilestone: number;
    previousmilestone: number;
    reward: number;
    rewardType: RewardType;
    user: number;
}

export enum Resource {
    APPROVES = 'approves',
    COMMENTS = 'comments',
    PR = 'pr',
    XP = 'xp',
}
