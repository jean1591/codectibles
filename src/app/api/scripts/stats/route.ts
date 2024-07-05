import { DbError, DbTable } from "../../interfaces/database";
import { NextRequest, NextResponse } from "next/server";

import { Stat } from "../../interfaces/user";
import { createClient } from "@/utils/supabase/client";
import { flatten } from "lodash";

// TODO: reactivate policy on INSERT
export async function GET(request: NextRequest) {
  const supabase = createClient();

  const { data: users } = await supabase
    .from(DbTable.USER)
    .select("stats, username, authUserId");

  if (!users) {
    return NextResponse.json({ message: "No users returned", users });
  }

  const stats = flatten(
    users.map((user) => {
      return Object.entries(user.stats).map((key) => {
        const stat = key[1] as Stat;

        return {
          authUserId: user.authUserId,
          nextMilestone: stat.nextmilestone,
          previousMilestone: stat.previousmilestone,
          reward: stat.reward,
          type: stat.id,
          value: stat.user,
        };
      });
    })
  );

  const { error: insertStatError } = await supabase
    .from(DbTable.STAT)
    .insert(stats);

  if (insertStatError) {
    console.error(`${DbError.INSERT}: STAT"`, { error: insertStatError });
    return NextResponse.json({ message: "error" });
  }

  return NextResponse.json({ message: "success", users, stats });
}
