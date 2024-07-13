import { DbError, DbTable } from "@/app/api/interfaces/database";
import { NextRequest, NextResponse } from "next/server";

import { Quality } from "../../interfaces/collectible";
import { Resource } from "../../interfaces/user";
import { UserProfile } from "../../interfaces/social";
import { createClient } from "@/utils/supabase/server";

// TODO: get activity

interface DbUserRank {
  id: string;
  rank: number;
  username: string;
  xp: number;
}

export async function GET(
  request: NextRequest,
  { params }: { params: { userId: string } }
): Promise<NextResponse<UserProfile>> {
  // Here userId is in fact username
  const { userId: username } = params;

  const supabase = createClient();

  const { data: users } = await supabase
    .from(DbTable.USER)
    .select(
      "id, username, level, badges(icon,id), collectibles(icon, id, quality), stats(type, value), createdAt"
    )
    .eq("username", username);

  if (!users || users.length === 0) {
    throw new Error(`No users found for username ${username}`);
  }
  const user = users[0];

  let { data: userRanks, error: getUserRankError } = (await supabase.rpc(
    "get_user_rank",
    {
      p_user_id: user.id,
    }
  )) as unknown as { data: DbUserRank[]; error: Error };

  if (getUserRankError) {
    console.error(`${DbError.GET_RPC}: USERS"`, {
      error: JSON.stringify(getUserRankError, null, 2),
    });
  }

  return NextResponse.json({
    username: user.username,
    level: user.level,
    createdAt: formatDate(user.createdAt),
    badges: user.badges.map(({ icon, id }) => ({ icon, id })),
    collectibles: user.collectibles.map(({ icon, id, quality }) => ({
      icon,
      id,
      quality: quality as Quality,
    })),
    rank: userRanks[0].rank,
    xp: user.stats.find((stat) => stat.type === Resource.XP)?.value ?? 0,
  });
}

const formatDate = (date: string) => {
  return new Date(date).toISOString().slice(0, 10);
};
