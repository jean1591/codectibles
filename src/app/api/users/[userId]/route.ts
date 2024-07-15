import { DbError, DbTable } from "@/app/api/interfaces/database";
import { NextRequest, NextResponse } from "next/server";

import { Quality } from "../../interfaces/collectible";
import { Resource } from "../../interfaces/user";
import { SupabaseClient } from "@supabase/supabase-js";
import { UserProfile } from "../../interfaces/social";
import { createClient } from "@/utils/supabase/server";
import { getUserByAuthUserId } from "../../utils/user";

// TODO: get activity
// TODO: use RPC table enum for supabase.rpc

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
  const { userId: friendUsername } = params;

  const supabase = createClient();

  const friend = await getUserProfile(supabase, friendUsername);
  const friendRank = await getUserRank(supabase, friend.id);
  const isRelation = await getIsRelation(supabase, friend.id);

  return NextResponse.json({
    username: friendUsername,
    level: friend.level,
    createdAt: formatDate(friend.createdAt),
    badges: friend.badges.map(({ icon, id }) => ({ icon, id })),
    collectibles: friend.collectibles.map(({ icon, id, quality }) => ({
      icon,
      id,
      quality: quality as Quality,
    })),
    id: friend.id,
    isRelation,
    rank: friendRank,
    xp: friend.stats.find((stat) => stat.type === Resource.XP)?.value ?? 0,
  });
}

const formatDate = (date: string) => {
  return new Date(date).toISOString().slice(0, 10);
};

const getUserProfile = async (
  supabase: SupabaseClient,
  friendUsername: string
) => {
  const { data: friends } = await supabase
    .from(DbTable.USER)
    .select(
      "createdAt, id, level, username, badges(icon,id), collectibles(icon, id, quality), stats(type, value)"
    )
    .eq("username", friendUsername);

  if (!friends || friends.length === 0) {
    throw new Error(`No users found for username ${friendUsername}`);
  }

  return friends[0];
};

const getUserRank = async (
  supabase: SupabaseClient,
  userId: string
): Promise<number> => {
  let { data: friendRanks, error: getFriendRanksError } = (await supabase.rpc(
    "get_user_rank",
    {
      p_user_id: userId,
    }
  )) as unknown as { data: DbUserRank[]; error: Error };

  if (getFriendRanksError) {
    console.error(`${DbError.GET_RPC}: USERS"`, {
      error: JSON.stringify(getFriendRanksError, null, 2),
    });
  }

  return friendRanks[0].rank;
};

const getIsRelation = async (
  supabase: SupabaseClient,
  friendId: string
): Promise<boolean> => {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session || !session.user) {
    throw new Error("User is not connected");
  }

  const { user: authUser } = session;

  const { id: userId } = await getUserByAuthUserId(supabase, authUser.id);

  const { data: relations } = await supabase
    .from(DbTable.RELATION)
    .select("followId")
    .eq("userId", userId);

  if (!relations) {
    throw new Error(`No relations found for userId ${userId}`);
  }

  return !!relations.find(({ followId }) => followId === friendId);
};
