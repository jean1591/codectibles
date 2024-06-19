import { NextRequest, NextResponse } from "next/server";
import { Reward, RewardType } from "@/app/interfaces";

import { DbTable } from "../interfaces/database";
import { createClient } from "@/utils/supabase/server";

type RewardAndNext = {
  rewards: Reward[];
  nextRewards: Reward[];
};

export async function GET(
  request: NextRequest
): Promise<NextResponse<RewardAndNext>> {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User is not connected");
  }

  const rewards: Reward[] = [];
  const nextRewards: Reward[] = [];

  const { data: unclaimedPr } = await supabase
    .from(DbTable.PR)
    .select("pr_id")
    .eq("user_id", user.id)
    .eq("claimed", false);

  if (unclaimedPr && unclaimedPr.length > 0) {
    rewards.push(generateUnclaimedPrReward(unclaimedPr));
  }

  const { count: prCount } = await supabase
    .from(DbTable.PR)
    .select("*", { count: "exact", head: true })
    .eq("user_id", user.id);

  if (prCount) {
    const nextPrMergeMilestone = generateNextPrMergeMilestone(prCount);
    nextRewards.push(nextPrMergeMilestone);
  }

  return NextResponse.json({ rewards, nextRewards });
}

const generateUnclaimedPrReward = (
  unclaimedPr: { pr_id: number }[]
): Reward => ({
  details: unclaimedPr.map((pr) => pr.pr_id),
  reward: unclaimedPr.length * 50,
  type: RewardType.MERGE,
  title: `${unclaimedPr.length} PR merged ✅`,
});

const generateNextPrMergeMilestone = (prCount: number): Reward => {
  return {
    type: RewardType.MILESTONE,
    title: `Next milestone in 1 PR`,
    details: { lowerBound: "4 PR", upperBound: "8 PR", progress: 75 },
    reward: 0,
  };
};
