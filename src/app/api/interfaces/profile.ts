export interface Badge {
    claimedAt: Date;
    description: string;
    icon: string;
    reward: number;
    rewardType: "coins" | "XP";
    title: string;
  }