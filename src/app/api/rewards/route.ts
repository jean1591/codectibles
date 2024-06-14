import { NextRequest, NextResponse } from "next/server";

import { Reward } from "@/app/interfaces";
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
    .from("pr")
    .select("*")
    .eq("user_id", user.id)
    .eq("claimed", false);

  if (!unclaimedPr || unclaimedPr.length === 0) {
    return NextResponse.json([]);
  }

  const formatUnclaimedPrToRewards: Reward = {
    details: unclaimedPr.map((pr) => pr.pr_id),
    reward: unclaimedPr.length * 2,
    type: "merge",
    title: `${unclaimedPr.length * 2} PR merged ✅`,
  };

  return NextResponse.json([formatUnclaimedPrToRewards]);
}
