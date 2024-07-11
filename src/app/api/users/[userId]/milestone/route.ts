import { DbError, DbTable } from "@/app/api/interfaces/database";
import { NextRequest, NextResponse } from "next/server";

import { Resource } from "@/app/api/interfaces/user";
import { createClient } from "@/utils/supabase/server";

export async function PUT(
  request: NextRequest,
  { params }: { params: { userId: string } }
): Promise<NextResponse> {
  const { userId } = params;

  const supabase = createClient();

  const {
    xp: { value },
    milestone: { nextMilestone, previousMilestone, type },
  } = await request.json();

  /* Stats */
  // XP
  const { error: updateStatsXpError } = await supabase
    .from(DbTable.STAT)
    .update({ value })
    .eq("userId", userId)
    .eq("type", Resource.XP);

  if (updateStatsXpError) {
    console.error(`${DbError.UPDATE}: STATS"`, {
      error: JSON.stringify(updateStatsXpError, null, 2),
    });
  }

  // Milestone stat
  const { error: updateStatsMilestoneError } = await supabase
    .from(DbTable.STAT)
    .update({ nextMilestone, previousMilestone })
    .eq("userId", userId)
    .eq("type", type);

  if (updateStatsMilestoneError) {
    console.error(`${DbError.UPDATE}: STATS"`, {
      error: JSON.stringify(updateStatsMilestoneError, null, 2),
    });
  }

  return NextResponse.json({ success: true });
}
