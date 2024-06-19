import { DbError, DbTable } from "../interfaces/database";
import { NextRequest, NextResponse } from "next/server";

import { createClient } from "@/utils/supabase/server";
import { User } from "@/app/interfaces";

export async function GET(request: NextRequest): Promise<NextResponse> {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User is not connected");
  }

  const { data: users } = await supabase
    .from(DbTable.USER)
    .select("auth_user_id, coins, fetched_at, id, next_pr_milestone, token, user_name, xp, zoo")
    .eq("auth_user_id", user.id);

  if (!users || users.length === 0) {
    throw new Error(`No users found for id ${user.id}`);
  }

  const { auth_user_id, coins, fetched_at, id, next_pr_milestone, token, user_name, xp, zoo } = users[0];

  const formattedUser: User = {
    authUserId: auth_user_id,
    coins,
    fetchedAt: fetched_at,
    userId: id,
    nextPrMilestone: next_pr_milestone,
    token,
    userName: user_name,
    xp,
    zoo
  }

  return NextResponse.json({ user: formattedUser });
}


export async function PUT(request: NextRequest): Promise<NextResponse> {
  const { coins, zoo } = await request.json();

  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User is not connected");
  }

  const { error: updateUserError } = await supabase
    .from(DbTable.USER)
    .update({ coins, zoo: JSON.stringify(zoo) })
    .eq("auth_user_id", user.id);

  if (updateUserError) {
    console.error(`${DbError.UPDATE}: USER"`, {
      error: JSON.stringify(updateUserError, null, 2),
    });
  }

  return NextResponse.json({ success: true });
}
