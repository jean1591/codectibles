import { NextRequest, NextResponse } from "next/server";

import { DbTable } from "@/app/api/interfaces/database";
import { Rank } from "@/app/api/interfaces/leaderboard";
import { Resource } from "@/app/api/interfaces/user";
import { createClient } from "@/utils/supabase/server";

interface DbLeaderboard {
  data: { value: number; users: { username: string } }[];
}

export async function GET(
  request: NextRequest,
  { params }: { params: { userId: string } }
): Promise<NextResponse<Rank[]>> {
  const { userId } = params;

  const supabase = createClient();

  const { data: dbLeaderboard } = (await supabase
    .from(DbTable.STAT)
    .select(`value, users(username)`)
    .eq("type", Resource.XP)
    .order("value", { ascending: false })
    .limit(5)) as unknown as DbLeaderboard;

  const leaderboard: Rank[] = dbLeaderboard?.map((user, index) => ({
    username: user.users.username,
    xp: user.value,
    rank: rankGenerator(index + 1),
  }));

  return NextResponse.json(leaderboard);
}

const rankGenerator = (rank: number): number | "🥇" | "🥈" | "🥉" => {
  switch (rank) {
    case 1:
      return "🥇";
    case 2:
      return "🥈";
    case 3:
      return "🥉";
    default:
      return rank;
  }
};
