import { NextRequest, NextResponse } from "next/server";
import { User, UserDb } from "../interfaces/user";
import { createClient } from "@/utils/supabase/server";
import { DbTable } from "../interfaces/database";

export async function GET(request: NextRequest): Promise<NextResponse<User>> {
    const supabase = createClient();
    const {
        data: { user: authUser },
    } = await supabase.auth.getUser();

    if (!authUser) {
        throw new Error("User is not connected");
    }

    const { data: users } = await supabase
        .from(DbTable.USER)
        .select("badges, level, stats, token, username")
        .eq("authUserId", authUser.id);

    if (!users || users.length === 0) {
        throw new Error(`No users found for id ${authUser.id}`);
    }

    const dbUser = users[0] as UserDb

    const { data: badges } = await supabase
        .from(DbTable.BADGE)
        .select("*");

    if (!badges || badges.length === 0) {
        throw new Error("No badges found");
    }

    const user: User = {
        ...dbUser, badges: {
            unlocked: dbUser.badges,
            locked: badges.filter(badge => !dbUser.badges.map(userBadge => userBadge.id).includes(badge.id))
        }
    }

    return NextResponse.json(user);
}
