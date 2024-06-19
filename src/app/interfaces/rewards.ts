export type RewardDetails =
  | number[]
  | { lowerBound: number; progress: number; upperBound: number };

export interface Reward {
  details: RewardDetails;
  reward: number;
  title: string;
  type: RewardType;
}


export type CurrentRewardsAndNextRewards = {
  rewards: Reward[];
  nextRewards: Reward[];
};

export enum RewardType {
  MERGE = "merge",
  MILESTONE = "milestone",
}
