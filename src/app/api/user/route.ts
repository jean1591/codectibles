import { DbError, DbTable } from "../interfaces/database";
import { NextRequest, NextResponse } from "next/server";
import { User, UserWithRelations } from "../interfaces/user";

import { badges } from "../badges/constants/badges";
import { computeLockedAndUnlockedBadges } from "../utils/badges";
import { createClient } from "@/utils/supabase/server";

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

  const { data: users } = await supabase
    .from(DbTable.USER)
    .select(
      // TODO: change userBadges by badges once badges table replaced
      "authUserId, fetchedAt, id, level, prToClaim, token, username, userBadges(*), stats(*)"
    )
    .eq("authUserId", authUser.id);

  if (!users || users.length === 0) {
    throw new Error(`No users found for id ${authUser.id}`);
  }

  // TODO: create method to abstract logic
  // Compute user badges
  const { data: prTypeCount } = await supabase
    .from(DbTable.PR)
    .select("prType, prType.count()")
    .eq("userId", users[0].id);

  const claimed = users[0].userBadges;
  const claimedTitles: string[] = claimed.map(({ title }) => title);
  const { locked, unlocked } = computeLockedAndUnlockedBadges(
    claimedTitles,
    prTypeCount ?? []
  );

  const user = {
    ...users[0],
    badges: {
      claimed,
      locked,
      unlocked,
    },
  } as UserWithRelations;

  return NextResponse.json(user);
}
