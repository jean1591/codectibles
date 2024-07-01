import { DbError, DbTable } from "../../../interfaces/database";
import { NextRequest, NextResponse } from "next/server";

import { createClient } from "@/utils/supabase/server";
import { BaseCollectible, Collectible } from "@/app/api/interfaces/collectible";

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

export async function POST(request: NextRequest, { params }: { params: { authUserId: string } }): Promise<NextResponse> {
  const supabase = createClient();
  const { authUserId } = params

  const { collectibles: newCollectibles }: { collectibles: BaseCollectible[] } = await request.json();
  const { data: collectibles } = await supabase
    .from(DbTable.COLLECTIBLE)
    .select("*")
    .eq("authUserId", authUserId)
    .in(
      "icon",
      newCollectibles.map(({ icon }) => icon)
    );

  if (!collectibles) {
    throw new Error(`No collectibles found for authUserId ${authUserId}`);
  }

  const collectiblesUpsert: Collectible[] = newCollectibles.map(collectible => {
    const { icon, quality } = collectible

    const existingCollectible = collectibles.find(coll => coll.icon === icon && coll.quality === quality)

    if (existingCollectible) {
      return { ...existingCollectible, count: existingCollectible.count + 1 }
    }

    return { authUserId, ...collectible }
  })

  const { error } = await supabase
    .from(DbTable.COLLECTIBLE)
    .upsert(collectiblesUpsert, { onConflict: 'id', ignoreDuplicates: false, defaultToNull: false })

  if (error) {
    console.error(`${DbError.UPDATE}: COLLECTIBLE"`, {
      error: JSON.stringify(error, null, 2),
    });
  }

  return NextResponse.json({ success: true });
}