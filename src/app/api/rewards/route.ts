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
    const nextPrMergeMilestone = generateNextPrMilestone(prCount);
    nextRewards.push(nextPrMergeMilestone);

    // @ts-expect-error lowerBound is present in nextPrMergeMilestone.details
    if (`${prCount} PR` === nextPrMergeMilestone.details.lowerBound) {
      rewards.push(generatePrMilestoneReward(prCount));
    }
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

const generatePrMilestoneReward = (
  prCount: number
): Reward => ({
  details: [],
  reward: prCount * 5,
  type: RewardType.MILESTONE,
  title: `${prCount} PR milestone reached ✅`,
});

const generateNextPrMilestone = (prCount: number): Reward => {
  const { lowerBound, upperBound } = getPrMilestoneBounds(prCount)
  const progress = Math.ceil((prCount - lowerBound) / (upperBound - lowerBound) * 100)

  return {
    type: RewardType.MILESTONE,
    title: `Merge ${upperBound - prCount} PR to reach next milestone`,
    details: { lowerBound: `${lowerBound} PR`, upperBound: `${upperBound} PR`, progress: `${progress}%` },
    reward: 0,
  };
};

const getPrMilestoneBounds = (prCount: number): { upperBound: number, lowerBound: number } => {
  if (prCount === 0) {
    return { upperBound: 1, lowerBound: 0 };
  }

  let currentPowerOfTwo = 1;

  while (2 ** currentPowerOfTwo < prCount) {
    currentPowerOfTwo += 1;
  }

  if (prCount === 2 ** currentPowerOfTwo) {
    return { upperBound: 2 ** (currentPowerOfTwo + 1), lowerBound: prCount };
  }

  return { upperBound: 2 ** currentPowerOfTwo, lowerBound: 2 ** (currentPowerOfTwo - 1) };
}