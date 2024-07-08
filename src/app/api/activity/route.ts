import { DbError, DbTable } from "../interfaces/database";
import { NextRequest, NextResponse } from "next/server";

import { Activity } from "../interfaces/activity";
import { createClient } from "@/utils/supabase/server";

export async function POST(request: NextRequest): Promise<NextResponse> {
  const { activity }: { activity: Activity } = await request.json();

  const supabase = createClient();

  const { error } = await supabase.from(DbTable.ACTIVITY).insert(activity);

  if (error) {
    console.error(`${DbError.INSERT}: ACTIVITY`, { error });
  }

  return NextResponse.json({ success: true });
}
