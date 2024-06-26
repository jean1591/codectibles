export enum ActivityType {
  ACCOUNT_CREATED = "accountCreated",
  BADGE_CLAIMED = "badgeClaimed",
  LEVEL_UP = "levelUp",
}

export interface Activity {
    authUserId: string,
    createdAt: string;
    details: string;
    id: string;
    type: ActivityType;
}