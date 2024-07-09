import { Resource } from "./user";

export interface Stat {
  nextMilestone: number;
  previousMilestone: number;
  reward: number;
  type: Resource;
  value: number;
}
