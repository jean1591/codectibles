export type User = Omit<UserDb, 'badges'> & {
    badges: {
        unlocked: BadgeWithUnlockedAt[];
        locked: BadgeWithUnlockedBoolean[];
    }
}

export interface UserDb {
    authUserId: string,
    badges: BadgeWithUnlockedAt[];
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
    title: string;
    threshold: number;
    type: Resource
}

export type BadgeWithUnlockedAt = { unlockedAt: string } & Badge
export type BadgeWithUnlockedBoolean = { unlocked: boolean } & Badge

export enum RewardType {
    XP = "xp",
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
