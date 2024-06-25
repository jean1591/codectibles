import { SupabaseClient } from "@supabase/supabase-js";
import { User } from "../interfaces/user";
import { DbTable } from "../interfaces/database";
import { decrypt } from "@/utils/hash";
import { conventionalCommitType } from "../interfaces/github"

export const getUserDetails = async (supabase: SupabaseClient, userId: string): Promise<Pick<User, 'fetchedAt' | 'stats' | 'token' | 'username'>> => {
    const { data: users } = await supabase
        .from(DbTable.USER)
        .select("fetchedAt, stats, token, username")
        .eq("authUserId", userId);

    if (!users || users.length === 0) {
        throw new Error(`No users found for id ${userId}`);
    }

    const { fetchedAt, stats,
        token: hashedToken, username,
    } = users[0];

    const token = decrypt(hashedToken);

    return { fetchedAt, stats, token, username }
}

export const getPrType = (title: string): string | null => {
    try {
        const prType = title.split(":")[0]

        if (conventionalCommitType.includes(prType)) {
            return prType
        } else {
            return null
        }
    } catch (error) {
        return null

    }
}