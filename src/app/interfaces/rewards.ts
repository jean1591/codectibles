export type RewardDetails =
  | number[]
  | { lowerBound: number; progress: number; upperBound: number };

export interface Reward {
  details: RewardDetails;
  reward: number;
  title: string;
  type: RewardType;
}

export enum RewardType {
  MERGE = "merge",
  MILESTONE = "milestone",
}
