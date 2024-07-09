import { DbError, DbTable } from "../interfaces/database";
import { NextRequest, NextResponse } from "next/server";
import { User, UserWithRelations } from "../interfaces/user";

import { createClient } from "@/utils/supabase/server";

export async function GET(
  request: NextRequest
): Promise<NextResponse<UserWithRelations>> {
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
    .select(
      "authUserId, fetchedAt, id, level, prToClaim, token, username, stats(*)"
    )
    .eq("authUserId", authUser.id);

  if (!users || users.length === 0) {
    throw new Error(`No users found for id ${authUser.id}`);
  }

  const user = users[0] as UserWithRelations;

  return NextResponse.json(user);
}

// TODO: create user badges table and delete this endpoint
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
