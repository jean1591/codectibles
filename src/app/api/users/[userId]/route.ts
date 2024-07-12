import { NextRequest, NextResponse } from "next/server";

import { DbTable } from "@/app/api/interfaces/database";
import { Quality } from "../../interfaces/collectible";
import { Resource } from "../../interfaces/user";
import { UserProfile } from "../../interfaces/social";
import { createClient } from "@/utils/supabase/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { userId: string } }
): Promise<NextResponse<UserProfile>> {
  const { userId } = params;

  const supabase = createClient();

  const { data: users } = await supabase
    .from(DbTable.USER)
    .select(
      "username, level, badges(icon), collectibles(icon, quality), stats(type, value), createdAt"
    )
    .eq("id", userId);

  if (!users || users.length === 0) {
    throw new Error(`No users found for userId ${userId}`);
  }
  const user = users[0];

  return NextResponse.json({
    username: user.username,
    level: user.level,
    createdAt: formatDate(user.createdAt),
    badges: user.badges.map(({ icon }) => icon),
    collectibles: user.collectibles.map(({ icon, quality }) => ({
      icon,
      quality: quality as Quality,
    })),
    xp: user.stats.find((stat) => stat.type === Resource.XP)?.value ?? 0,
  });
}

const formatDate = (date: string) => {
  return new Date(date).toISOString().slice(0, 10);
};
