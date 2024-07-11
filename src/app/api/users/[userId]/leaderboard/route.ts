import { NextRequest, NextResponse } from "next/server";

import { Rank } from "@/app/api/interfaces/leaderboard";

export async function GET(request: NextRequest): Promise<NextResponse<Rank[]>> {
  return NextResponse.json([
    {
      rank: "🥇",
      username: "arnaud",
      xp: 10,
    },
    {
      rank: "🥈",
      username: "guillaume",
      xp: 9,
    },
    {
      rank: "🥉",
      username: "gilux",
      xp: 8,
    },
    {
      rank: 4,
      username: "camille",
      xp: 7,
    },
    {
      rank: 123,
      username: "jean1591",
      xp: 5,
    },
  ]);
}
