import { DbError, DbTable } from "@/app/api/interfaces/database";
import { NextRequest, NextResponse } from "next/server";

import { Quality } from "../../interfaces/collectible";
import { Resource } from "../../interfaces/user";
import { UserProfile } from "../../interfaces/social";
import { createClient } from "@/utils/supabase/server";

// TODO: get activity
// TODO: use RPC table for supabase.rpc

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

  const { data: friends } = await supabase
    .from(DbTable.USER)
    .select(
      "createdAt, id, level, username, badges(icon,id), collectibles(icon, id, quality), stats(type, value)"
    )
    .eq("username", username);

  if (!friends || friends.length === 0) {
    throw new Error(`No users found for username ${username}`);
  }
  const friend = friends[0];

  let { data: friendRanks, error: getFriendRanksError } = (await supabase.rpc(
    "get_user_rank",
    {
      p_user_id: friend.id,
    }
  )) as unknown as { data: DbUserRank[]; error: Error };

  if (getFriendRanksError) {
    console.error(`${DbError.GET_RPC}: USERS"`, {
      error: JSON.stringify(getFriendRanksError, null, 2),
    });
  }

  return NextResponse.json({
    username: friend.username,
    level: friend.level,
    createdAt: formatDate(friend.createdAt),
    badges: friend.badges.map(({ icon, id }) => ({ icon, id })),
    collectibles: friend.collectibles.map(({ icon, id, quality }) => ({
      icon,
      id,
      quality: quality as Quality,
    })),
    rank: friendRanks[0].rank,
    xp: friend.stats.find((stat) => stat.type === Resource.XP)?.value ?? 0,
  });
}

const formatDate = (date: string) => {
  return new Date(date).toISOString().slice(0, 10);
};
