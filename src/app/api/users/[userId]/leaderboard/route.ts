import { NextRequest, NextResponse } from "next/server";

import { DbTable } from "@/app/api/interfaces/database";
import { Rank } from "@/app/api/interfaces/leaderboard";
import { Resource } from "@/app/api/interfaces/user";
import { createClient } from "@/utils/supabase/server";

interface DbLeaderboard {
  value: number;
  users: { id: string; username: string };
}

interface DbLeaderboardWithData {
  data: DbLeaderboard[];
}

export async function GET(
  request: NextRequest,
  { params }: { params: { userId: string } }
): Promise<NextResponse<Rank[]>> {
  const { userId } = params;

  const supabase = createClient();

  const { data: dbLeaderboard } = (await supabase
    .from(DbTable.STAT)
    .select("value, users(id, username)")
    .eq("type", Resource.XP)
    .order("value", { ascending: false })
    .limit(5)) as unknown as DbLeaderboardWithData;

  const leaderboard: Rank[] = dbLeaderboard?.map((user, index) => ({
    username: user.users.username,
    xp: user.value,
    rank: rankGenerator(index + 1),
  }));

  if (!isUserInTopFive(dbLeaderboard, userId)) {
    const { data: userStats } = (await supabase
      .from(DbTable.STAT)
      .select("value, users(id, username)")
      .eq("userId", userId)
      .eq("type", Resource.XP)) as unknown as DbLeaderboardWithData;

    // TODO: compute user rank
    leaderboard.pop();
    leaderboard.push({
      username: userStats[0].users.username,
      xp: userStats[0].value,
      rank: "?",
    });
  }

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

const isUserInTopFive = (dbLeaderboard: DbLeaderboard[], userId: string) =>
  dbLeaderboard.find(({ users: { id } }) => id === userId);
