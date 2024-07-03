import { DbError, DbTable } from "../interfaces/database";
import { NextRequest, NextResponse } from "next/server";

import { Activity } from "../interfaces/activity";
import { createClient } from "@/utils/supabase/server";

export async function GET(request: NextRequest): Promise<NextResponse> {
  const supabase = createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session || !session.user) {
    throw new Error("User is not connected");
  }

  const { user: authUser } = session;

  const { data: activities } = await supabase
    .from(DbTable.ACTIVITY)
    .select("*")
    .eq("authUserId", authUser.id)
    .order("createdAt", { ascending: false });

  if (!activities || activities.length === 0) {
    throw new Error(`No activities found for authUserId ${authUser.id}`);
  }

  return NextResponse.json(
    activities.map((activity) => ({
      ...activity,
      createdAt: formatDate(activity.createdAt),
    }))
  );
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  const { activity }: { activity: Activity } = await request.json();

  const supabase = createClient();

  const { error } = await supabase.from(DbTable.ACTIVITY).insert(activity);

  if (error) {
    console.error(`${DbError.INSERT}: ACTIVITY`, { error });
  }

  return NextResponse.json({ success: true });
}

const formatDate = (date: string) => {
  return new Date(date).toISOString().slice(0, 10);
};
