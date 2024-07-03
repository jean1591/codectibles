import { DbError, DbTable } from "../interfaces/database";
import { NextRequest, NextResponse } from "next/server";
import { User, UserDb } from "../interfaces/user";

import { computeUserBadges } from "../utils/badges";
import { createClient } from "@/utils/supabase/server";

export async function GET(request: NextRequest): Promise<NextResponse<User>> {
  const supabase = createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session || !session.user) {
    throw new Error("User is not connected");
  }

  const { user: authUser } = session;

  const { data: users } = await supabase
    .from(DbTable.USER)
    .select("authUserId, badges, level, prToClaim, stats, token, username")
    .eq("authUserId", authUser.id);

  if (!users || users.length === 0) {
    throw new Error(`No users found for id ${authUser.id}`);
  }

  const dbUser = users[0] as UserDb;

  const { data: badges } = await supabase.from(DbTable.BADGE).select("*");

  if (!badges || badges.length === 0) {
    throw new Error("No badges found");
  }

  const { data: prTypeCount } = await supabase
    .from(DbTable.PR)
    .select("prType, prType.count()")
    .eq("authUserId", authUser.id);

  // TODO: use claimed, unlocked and locked
  const user: User = {
    ...dbUser,
    badges: {
      unlocked: dbUser.badges,
      locked: computeUserBadges(dbUser.badges, badges, prTypeCount ?? []),
    },
  };

  return NextResponse.json(user);
}

export async function PUT(request: NextRequest): Promise<NextResponse> {
  const supabase = createClient();

  const { user }: { user: User } = await request.json();

  const { error: updateUserError } = await supabase
    .from(DbTable.USER)
    .update(user)
    .eq("authUserId", user.authUserId);

  if (updateUserError) {
    console.error(`${DbError.UPDATE}: USER"`, {
      error: JSON.stringify(updateUserError, null, 2),
    });
  }

  return NextResponse.json({ success: true });
}
