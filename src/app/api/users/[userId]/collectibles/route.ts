import { BaseCollectible, Collectible } from "@/app/api/interfaces/collectible";
import { DbError, DbTable } from "@/app/api/interfaces/database";
import { NextRequest, NextResponse } from "next/server";

import { createClient } from "@/utils/supabase/server";

export async function POST(
  request: NextRequest,
  { params }: { params: { userId: string } }
): Promise<NextResponse> {
  const { userId } = params;

  const supabase = createClient();

  const { collectibles: newCollectibles }: { collectibles: BaseCollectible[] } =
    await request.json();
  const { data: collectibles } = await supabase
    .from(DbTable.COLLECTIBLE)
    .select("*")
    .eq("userId", userId)
    .in(
      "icon",
      newCollectibles.map(({ icon }) => icon)
    );

  if (!collectibles) {
    throw new Error(`No collectibles found for userId ${userId}`);
  }

  const collectiblesUpsert: Collectible[] = newCollectibles.map(
    (collectible) => {
      const { icon, quality } = collectible;

      const existingCollectible = collectibles.find(
        (coll) => coll.icon === icon && coll.quality === quality
      );

      if (existingCollectible) {
        return { ...existingCollectible, count: existingCollectible.count + 1 };
      }

      return { userId, ...collectible };
    }
  );

  const { error } = await supabase
    .from(DbTable.COLLECTIBLE)
    .upsert(collectiblesUpsert, {
      onConflict: "id",
      ignoreDuplicates: false,
      defaultToNull: false,
    });

  if (error) {
    console.error(`${DbError.UPDATE}: COLLECTIBLE"`, {
      error: JSON.stringify(error, null, 2),
    });
  }

  return NextResponse.json({ success: true });
}
