import { NextRequest, NextResponse } from "next/server";
import { CurrentRewardsAndNextRewards, Reward, RewardDetails, RewardType } from "@/app/interfaces";

import { DbTable } from "../interfaces/database";
import { createClient } from "@/utils/supabase/server";

// TODO: load user in state to not have to fetch it every time

export async function GET(
  request: NextRequest
): Promise<NextResponse<CurrentRewardsAndNextRewards>> {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User is not connected");
  }

  const rewards: Reward[] = [];
  const nextRewards: Reward[] = [];

  /* Unclaimed PR */
  const { data: unclaimedPr } = await supabase
    .from(DbTable.PR)
    .select("pr_id")
    .eq("user_id", user.id)
    .eq("claimed", false);

  if (unclaimedPr && unclaimedPr.length > 0) {
    rewards.push(generateUnclaimedPrReward(unclaimedPr));
  }

  /* PR milestone */
  const { count: prCount } = await supabase
    .from(DbTable.PR)
    .select("*", { count: "exact", head: true })
    .eq("user_id", user.id);

  if (prCount) {
    const nextPrMergeMilestone = generateNextPrMilestone(prCount);
    nextRewards.push(nextPrMergeMilestone);

    const { data: users } = await supabase
      .from(DbTable.USER)
      .select("nextPrMilestone")
      .eq("auth_user_id", user.id);

    if (!users || users.length === 0) {
      throw new Error(`No users found for id ${user.id}`);
    }

    const { nextPrMilestone } = users[0];

    if (prCount >= nextPrMilestone) {
      rewards.push(generatePrMilestoneReward(prCount, nextPrMergeMilestone.details));
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
  prCount: number, details: RewardDetails
): Reward => ({
  details,
  // @ts-expect-error details are defined
  reward: Math.min((details.upperBound - details.lowerBound) * 5, 20),
  type: RewardType.MILESTONE,
  title: `${prCount} PR milestone 📍`,
});

const generateNextPrMilestone = (prCount: number): Reward => {
  const { lowerBound, upperBound } = getPrMilestoneBounds(prCount)
  const progress = Math.ceil((prCount - lowerBound) / (upperBound - lowerBound) * 100)

  return {
    type: RewardType.MILESTONE,
    title: `Merge ${upperBound - prCount} PR to reach next milestone`,
    details: { lowerBound, upperBound, progress },
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
