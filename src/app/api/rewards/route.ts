import { NextRequest, NextResponse } from "next/server";
import { Reward, RewardType } from "@/app/interfaces";

import { DbTable } from "../interfaces/database";
import { createClient } from "@/utils/supabase/server";

export async function GET(
  request: NextRequest
): Promise<NextResponse<Reward[]>> {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User is not connected");
  }

  const { data: unclaimedPr } = await supabase
    .from(DbTable.PR)
    .select("pr_id")
    .eq("user_id", user.id)
    .eq("claimed", false);

  if (!unclaimedPr || unclaimedPr.length === 0) {
    return NextResponse.json([]);
  }

  const formatUnclaimedPrToRewards = generateUnclaimedPrReward(unclaimedPr);

  return NextResponse.json([formatUnclaimedPrToRewards]);
}

const generateUnclaimedPrReward = (
  unclaimedPr: { pr_id: number }[]
): Reward => ({
  details: unclaimedPr.map((pr) => pr.pr_id),
  reward: unclaimedPr.length * 2,
  type: RewardType.MERGE,
  title: `${unclaimedPr.length * 2} PR merged ✅`,
});
