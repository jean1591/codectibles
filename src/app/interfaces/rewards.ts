export interface Reward {
  details: number[];
  reward: number;
  title: string;
  type: RewardType;
}

export enum RewardType {
  MERGE = "merge",
}
