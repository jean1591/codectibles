import { NextRequest, NextResponse } from "next/server";

import { DbTable } from "../interfaces/database";
import { UserWithRelations } from "../interfaces/user";
import { computeLockedAndUnlockedBadges } from "../utils/badges";
import { createClient } from "@/utils/supabase/server";
import { getUserByAuthUserId } from "../utils/user";

export async function GET(
  request: NextRequest
): Promise<NextResponse<UserWithRelations>> {
  const supabase = createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session || !session.user) {
    throw new Error("User is not connected");
  }

  const { user: authUser } = session;

  const dbUser = await getUserByAuthUserId(supabase, authUser.id);

  // Compute user badges
  const { data: prTypeCount } = await supabase
    .from(DbTable.PR)
    .select("prType, prType.count()")
    .eq("userId", dbUser.id);

  const { badges: claimed, collectibles } = dbUser;
  const claimedTitles: string[] = claimed.map(({ title }) => title);
  const { locked, unlocked } = computeLockedAndUnlockedBadges(
    claimedTitles,
    collectibles,
    prTypeCount ?? []
  );

  const user = {
    ...dbUser,
    badges: {
      claimed,
      locked,
      unlocked,
    },
  } as UserWithRelations;

  return NextResponse.json(user);
}
