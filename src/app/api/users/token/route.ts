import { NextRequest, NextResponse } from "next/server";

import { DbTable } from "../../interfaces/database";
import { createClient } from "@/utils/supabase/server";

export async function GET(
  request: NextRequest
): Promise<NextResponse<{ token: string | null }>> {
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
    .select("token")
    .eq("authUserId", authUser.id);

  if (!users || users.length === 0) {
    throw new Error(`No users found for authUserId ${authUser.id}`);
  }

  return NextResponse.json({ token: users[0].token });
}
