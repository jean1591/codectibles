export interface Reward {
  details:
    | number[]
    | { lowerBound: string; progress: number; upperBound: string };
  reward: number;
  title: string;
  type: RewardType;
}

export enum RewardType {
  MERGE = "merge",
  MILESTONE = "milestone",
}
