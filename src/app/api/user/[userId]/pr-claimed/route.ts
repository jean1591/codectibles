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

  const { updatedXpValue } = await request.json();

  /* User */
  const { error: updateUserError } = await supabase
    .from(DbTable.USER)
    .update({ prToClaim: 0 })
    .eq("id", userId);

  if (updateUserError) {
    console.error(`${DbError.UPDATE}: USER"`, {
      error: JSON.stringify(updateUserError, null, 2),
    });
  }

  /* Stats */
  const { error: updateStatsError } = await supabase
    .from(DbTable.STAT)
    .update({ value: updatedXpValue })
    .eq("userId", userId)
    .eq("type", Resource.XP);

  if (updateStatsError) {
    console.error(`${DbError.UPDATE}: STATS"`, {
      error: JSON.stringify(updateStatsError, null, 2),
    });
  }

  /* PR */
  const { error: updatePrError } = await supabase
    .from(DbTable.PR)
    .update({ claimed: true })
    .eq("userId", userId);

  if (updatePrError) {
    console.error(`${DbError.UPDATE}: PR"`, {
      error: JSON.stringify(updatePrError, null, 2),
    });
  }

  return NextResponse.json({ success: true });
}
