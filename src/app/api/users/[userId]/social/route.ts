import { DbError, DbTable } from "@/app/api/interfaces/database";
import {
  Follow,
  FriendActivity,
  Rank,
  Social,
} from "@/app/api/interfaces/social";
import { NextRequest, NextResponse } from "next/server";

import { Resource } from "@/app/api/interfaces/user";
import { SupabaseClient } from "@supabase/supabase-js";
import { createClient } from "@/utils/supabase/server";

interface DbLeaderboard {
  value: number;
  users: { id: string; username: string };
}

interface DbLeaderboardWithData {
  data: DbLeaderboard[];
}
interface DbFollow {
  friendUsername: string;
  userId: string;
  level: number;
  username: string;
  xp: number;
}

export async function GET(
  request: NextRequest,
  { params }: { params: { userId: string } }
): Promise<NextResponse<Social>> {
  const { userId } = params;

  const supabase = createClient();

  const leaderboard = await getLeaderBoard(supabase, userId);
  const userFollows = await getUserFollows(supabase, userId);
  const friendsActivity = await getFriendsActivity(supabase, userId);

  return NextResponse.json({
    leaderboard,
    follows: userFollows,
    friendsActivity,
  });
}

const getLeaderBoard = async (
  supabase: SupabaseClient,
  userId: string
): Promise<Rank[]> => {
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

  return leaderboard;
};

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

const getUserFollows = async (
  supabase: SupabaseClient,
  userId: string
): Promise<Follow[]> => {
  let { data, error: getUserRelationsError } = (await supabase.rpc(
    "get_user_relations",
    {
      p_user_id: userId,
    }
  )) as unknown as { data: DbFollow[]; error: Error };

  if (getUserRelationsError) {
    console.error(`${DbError.GET_RPC}: USERS"`, {
      error: JSON.stringify(getUserRelationsError, null, 2),
    });
  }

  return data.map((user) => ({
    id: user.userId,
    level: user.level,
    username: user.friendUsername,
    xp: user.xp,
  }));
};

const getFriendsActivity = async (
  supabase: SupabaseClient,
  userId: string
): Promise<FriendActivity[]> => {
  let { data, error: getFriendsActivityError } = (await supabase.rpc(
    "get_relations_activity",
    {
      p_user_id: userId,
    }
  )) as unknown as { data: FriendActivity[]; error: Error };

  if (getFriendsActivityError) {
    console.error(`${DbError.GET_RPC}: USERS"`, {
      error: JSON.stringify(getFriendsActivityError, null, 2),
    });
  }

  return data;
};
