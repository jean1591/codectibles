import { NextRequest, NextResponse } from "next/server";

import { DbTable } from "@/app/api/interfaces/database";
import { createClient } from "@/utils/supabase/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { userId: string } }
): Promise<NextResponse> {
  const { userId } = params;

  const supabase = createClient();

  const { data: activities } = await supabase
    .from(DbTable.ACTIVITY)
    .select("*")
    .eq("userId", userId)
    .order("createdAt", { ascending: false });

  if (!activities || activities.length === 0) {
    throw new Error(`No activities found for userId ${userId}`);
  }

  return NextResponse.json(
    activities.map((activity) => ({
      ...activity,
      createdAt: formatDate(activity.createdAt),
    }))
  );
}

const formatDate = (date: string) => {
  return new Date(date).toISOString().slice(0, 10);
};
