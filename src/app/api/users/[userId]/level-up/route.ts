import { DbError, DbTable } from "@/app/api/interfaces/database";
import { NextRequest, NextResponse } from "next/server";

import { ActivityType } from "@/app/api/interfaces/activity";
import { Resource } from "@/app/api/interfaces/user";
import { createClient } from "@/utils/supabase/server";

export async function PUT(
  request: NextRequest,
  { params }: { params: { userId: string } }
): Promise<NextResponse> {
  const { userId } = params;

  const supabase = createClient();

  const {
    level,
    xp: { nextMilestone, previousMilestone },
  } = await request.json();

  /* Users */
  const { error: updateUserError } = await supabase
    .from(DbTable.USER)
    .update({ level })
    .eq("id", userId);

  if (updateUserError) {
    console.error(`${DbError.UPDATE}: USER"`, {
      error: JSON.stringify(updateUserError, null, 2),
    });
  }

  /* Stats */
  const { error: updateStatsError } = await supabase
    .from(DbTable.STAT)
    .update({ nextMilestone, previousMilestone })
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
      details: `level ${level}`,
      type: ActivityType.LEVEL_UP,
      userId,
    });

  if (insertActivityError) {
    console.error(`${DbError.INSERT}: ACTIVITY"`, {
      error: JSON.stringify(insertActivityError, null, 2),
    });
  }

  return NextResponse.json({ success: true });
}
