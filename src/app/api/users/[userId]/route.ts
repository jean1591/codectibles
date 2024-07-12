import { NextRequest, NextResponse } from "next/server";

import { DbTable } from "@/app/api/interfaces/database";
import { createClient } from "@/utils/supabase/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { userId: string } }
): Promise<NextResponse> {
  const { userId } = params;
  console.log("🚀 ~ userId:", userId);

  const supabase = createClient();

  const { data: users } = await supabase
    .from(DbTable.USER)
    .select(
      "username, level, badges(icon), collectibles(icon), stats(type, value), createdAt"
    )
    .eq("id", userId);

  if (!users || users.length === 0) {
    throw new Error(`No users found for userId ${userId}`);
  }
  console.log("🚀 ~ users:", users);

  return NextResponse.json({});
}

const formatDate = (date: string) => {
  return new Date(date).toISOString().slice(0, 10);
};
