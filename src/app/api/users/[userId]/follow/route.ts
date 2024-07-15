import { DbError, DbTable } from "@/app/api/interfaces/database";
import { NextRequest, NextResponse } from "next/server";

import { FollowAction } from "@/app/api/interfaces/social";
import { createClient } from "@/utils/supabase/server";

export async function PUT(request: NextRequest): Promise<NextResponse> {
  const {
    action,
    followId,
    userId,
  }: { action: FollowAction; followId: string; userId: string } =
    await request.json();

  const supabase = createClient();

  if (action === FollowAction.ADD) {
    const { error: insertRelationError } = await supabase
      .from(DbTable.RELATION)
      .insert({
        userId,
        followId,
      });

    if (insertRelationError) {
      console.error(`${DbError.INSERT}: RELATION"`, {
        error: insertRelationError,
      });
    }
  }

  if (action === FollowAction.DELETE) {
    const { error: deleteRelationError } = await supabase
      .from(DbTable.RELATION)
      .delete()
      .eq("userId", userId)
      .eq("followId", followId);

    if (deleteRelationError) {
      console.error(`${DbError.DELETE}: RELATION"`, {
        error: deleteRelationError,
      });
    }
  }

  return NextResponse.json({ success: true });
}
