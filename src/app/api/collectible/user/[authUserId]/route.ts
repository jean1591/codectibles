import { DbTable } from "../../../interfaces/database";
import { NextRequest, NextResponse } from "next/server";

import { createClient } from "@/utils/supabase/server";

export async function GET(request: NextRequest, { params }: { params: { authUserId: string } }): Promise<NextResponse> {
  const supabase = createClient();
  const { authUserId } = params

  const { data: collectibles } = await supabase
    .from(DbTable.COLLECTIBLE)
    .select("*")
    .eq("authUserId", authUserId);

  if (!collectibles) {
    throw new Error(`No collectibles found for authUserId ${authUserId}`);
  }

  return NextResponse.json(collectibles);
}