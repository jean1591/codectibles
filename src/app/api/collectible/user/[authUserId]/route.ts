import { DbError, DbTable } from "../../../interfaces/database";
import { NextRequest, NextResponse } from "next/server";

import { createClient } from "@/utils/supabase/server";
import { BaseCollectible } from "@/app/api/interfaces/collectible";

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

// TODO: insert or update all 3 colectibles at once instead of 3 separated calls to DB
export async function POST(request: NextRequest, { params }: { params: { authUserId: string } }): Promise<NextResponse> {
  const supabase = createClient();
  const { authUserId } = params

  const { collectible }: { collectible: BaseCollectible } = await request.json();
  const { icon, quality } = collectible

  const { data: collectibles } = await supabase
    .from(DbTable.COLLECTIBLE)
    .select("*")
    .eq("authUserId", authUserId)
    .eq('icon', icon)
    .eq('quality', quality);

  if (!collectibles) {
    throw new Error(`No collectibles found for authUserId ${authUserId}`);
  }

  // No collectibles with icon and quality: insert new collectible
  if (collectibles.length === 0) {
    const { error } = await supabase.from(DbTable.COLLECTIBLE).insert({ authUserId, ...collectible});

    if (error) {
      console.error(`${DbError.INSERT}: COLLECTIBLE`, { error });
    }
  }

  // Collectible found with icon and quality: increment account
  if (collectibles.length > 0) {
    const { error: updateUserError } = await supabase
      .from(DbTable.COLLECTIBLE)
      .update({ count: collectibles[0].count + 1 })
      .eq("authUserId", authUserId)
      .eq('icon', icon)
      .eq('quality', quality);

    if (updateUserError) {
      console.error(`${DbError.UPDATE}: COLLECTIBLE"`, {
        error: JSON.stringify(updateUserError, null, 2),
      });
    }
  }

  return NextResponse.json({ success: true });
}