import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";
import { DbTable } from "../../interfaces/database";

export async function GET(request: NextRequest): Promise<NextResponse<{ token: string | null }>> {
    const supabase = createClient();

    const {
        data: { user: authUser },
    } = await supabase.auth.getUser();

    if (!authUser) {
        throw new Error("User is not connected");
    }

    const { data: users } = await supabase
        .from(DbTable.USER)
        .select("token")
        .eq("authUserId", authUser.id);

    if (!users || users.length === 0) {
        throw new Error(`No users found for id ${authUser.id}`);
    }

    return NextResponse.json({ token: users[0].token });
}
