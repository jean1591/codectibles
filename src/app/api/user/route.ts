import { DbError, DbTable } from "../interfaces/database";
import { NextRequest, NextResponse } from "next/server";

import { createClient } from "@/utils/supabase/server";

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
