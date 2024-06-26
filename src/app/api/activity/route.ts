import { DbTable } from "../interfaces/database";
import { NextRequest, NextResponse } from "next/server";

import { createClient } from "@/utils/supabase/server";

export async function GET(request: NextRequest): Promise<NextResponse> {
  const supabase = createClient();

  const {
    data: { user: authUser },
  } = await supabase.auth.getUser();

  if (!authUser) {
    throw new Error("User is not connected");
  }

  const { data: activities } = await supabase
    .from(DbTable.ACTIVITY)
    .select("*")
    .eq("authUserId", authUser.id)
    .order('createdAt', { ascending: false });

  if (!activities || activities.length === 0) {
    throw new Error(`No activities found for authUserId ${authUser.id}`);
  }

  return NextResponse.json(activities.map((activity => ({ ...activity, createdAt: formatDate(activity.createdAt)}))));
}

const formatDate = (date: string) => {
  return new Date(date).toISOString().slice(0, 10);
};