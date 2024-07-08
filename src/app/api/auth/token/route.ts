import { DbError, DbTable } from "../../interfaces/database";
import { NextRequest, NextResponse } from "next/server";

import { createClient } from "@/utils/supabase/server";
import { encrypt } from "@/utils/hash";

export async function PUT(request: NextRequest): Promise<NextResponse> {
  const { token } = await request.json();

  const supabase = createClient();

  const {
    data: { user: authUser },
  } = await supabase.auth.getUser();

  if (!authUser) {
    throw new Error("User is not connected");
  }

  const hashedToken = encrypt(token);

  const { error } = await supabase
    .from(DbTable.USER)
    .update({ token: hashedToken })
    .eq("authUserId", authUser.id);

  if (error) {
    console.error(`${DbError.UPDATE}: USER"`, {
      error: JSON.stringify(error, null, 2),
    });
  }

  return NextResponse.json({ success: true });
}
