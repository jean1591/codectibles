import { DbError, DbTable } from "../interfaces/database";
import { NextRequest, NextResponse } from "next/server";

import { createClient } from "@/utils/supabase/server";

export async function PUT(request: NextRequest): Promise<NextResponse> {
  const { token } = await request.json();

  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User is not connected");
  }

  const { error } = await supabase
    .from(DbTable.USER)
    .update({ token })
    .eq("auth_user_id", user.id);

  if (error) {
    console.error(`${DbError.UPDATE}: USER"`, {
      error: JSON.stringify(error, null, 2),
    });
  }

  return NextResponse.json({ success: true });
}
