import { Badge, DbBadge } from "@/app/api/interfaces/badge";
import { DbError, DbTable } from "@/app/api/interfaces/database";
import { NextRequest, NextResponse } from "next/server";

import { ActivityType } from "@/app/api/interfaces/activity";
import { Resource } from "@/app/api/interfaces/user";
import { createClient } from "@/utils/supabase/server";
import { omit } from "lodash";

export async function PUT(
  request: NextRequest,
  { params }: { params: { userId: string } }
): Promise<NextResponse> {
  const { userId } = params;

  const supabase = createClient();

  const {
    badge,
    updatedXpValue: value,
  }: { badge: Badge; updatedXpValue: number } = await request.json();

  /* Badges */
  const { error: updateBadgesError } = await supabase
    .from(DbTable.USER_BADGE)
    .insert({
      ...omit(badge, "id"),
      unlockedAt: new Date().toISOString(),
      userId,
    } as DbBadge);

  if (updateBadgesError) {
    console.error(`${DbError.UPDATE}: USER_BADGE"`, {
      error: JSON.stringify(updateBadgesError, null, 2),
    });
  }

  /* Stats */
  const { error: updateStatsError } = await supabase
    .from(DbTable.STAT)
    .update({ value })
    .eq("userId", userId)
    .eq("type", Resource.XP);

  if (updateStatsError) {
    console.error(`${DbError.UPDATE}: STATS"`, {
      error: JSON.stringify(updateStatsError, null, 2),
    });
  }

  /* Activities */
  const { error: insertActivityError } = await supabase
    .from(DbTable.ACTIVITY)
    .insert({
      createdAt: new Date().toISOString(),
      details: badge.title,
      type: ActivityType.BADGE_CLAIMED,
      userId,
    });

  if (insertActivityError) {
    console.error(`${DbError.INSERT}: ACTIVITY"`, {
      error: JSON.stringify(insertActivityError, null, 2),
    });
  }

  return NextResponse.json({ success: true });
}
