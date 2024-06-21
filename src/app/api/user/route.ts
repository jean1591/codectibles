import { NextRequest, NextResponse } from "next/server";
import { badges as dbBadges, user as dbUser } from "../db";
import { User } from "../interfaces/user";

export async function GET(request: NextRequest): Promise<NextResponse<User>> {
    const badges = dbBadges
    const user: User = {
        ...dbUser, badges: {
            unlocked: dbUser.badges,
            locked: badges.filter(badge => !dbUser.badges.map(userBadge => userBadge.id).includes(badge.id))
        }
    }

    return NextResponse.json(user);
}
