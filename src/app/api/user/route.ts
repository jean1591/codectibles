import { NextRequest, NextResponse } from "next/server";
import { Badge, Resource, User, UserDb } from "../interfaces/user";
import { createClient } from "@/utils/supabase/server";
import { DbError, DbTable } from "../interfaces/database";

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
        .select("authUserId, badges, level, stats, token, username")
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

    const { count: prCount } = await supabase
        .from(DbTable.PR)
        .select("*", { count: "exact", head: true })
        .eq("authUserId", authUser.id);

    const user: User = {
        ...dbUser, badges: {
            unlocked: dbUser.badges,
            locked: computeUserBadges(dbUser.badges, badges, prCount ?? 0)
        }
    }

    return NextResponse.json(user);
}

const computeUserBadges = (userBadges: Badge[], badges: Badge[], prCount: number): Badge[] => {
    const lockedBadges = badges.filter(badge => !userBadges.map(userBadge => userBadge.id).includes(badge.id))
    const lockedPrBadges = lockedBadges.filter(badge => badge.type === Resource.PR)

    return [...getPrBadgesToClaim(prCount, lockedPrBadges)]
}

const getPrBadgesToClaim = (prCount: number, badges: Badge[]): Badge[] => {
    return badges
        .map(badge => ({ ...badge, unlocked: prCount > badge.threshold }))
        .sort((a, b) => a.threshold - b.threshold);
}

export async function PUT(request: NextRequest): Promise<NextResponse> {
    const supabase = createClient();

    const { user }: { user: User } = await request.json();

    const { error: updateUserError } = await supabase
        .from(DbTable.USER)
        .update(user)
        .eq("authUserId", user.authUserId);

    if (updateUserError) {
        console.error(`${DbError.UPDATE}: USER"`, {
            error: JSON.stringify(updateUserError, null, 2),
        });
    }

    return NextResponse.json({ success: true });
}
