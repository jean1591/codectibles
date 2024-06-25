import { DbError, DbTable } from "../interfaces/database";
import { GithubIssue, Issue } from "../interfaces/github";
import { NextRequest, NextResponse } from "next/server";

import { createClient } from "@/utils/supabase/server";
import { decrypt } from "@/utils/hash";
import { Resource, Stats, User, UserDb } from "../interfaces/user";
import { getPrType } from "../utils/pr";
import { SupabaseClient } from "@supabase/supabase-js";

export async function GET(request: NextRequest): Promise<NextResponse> {
    /* Fetch user data from DB */
    const supabase = createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        throw new Error("User is not connected");
    }

    const { fetchedAt, stats,
        token, username } = await getUserDetails(supabase, user.id)
    const githubPr = await getLatestGithubMergedPr(fetchedAt, token, username);
    const prToSave = await getPrNotSavedInDb(supabase, user.id, githubPr)
    insertNewPr(supabase, user.id, prToSave)
    updateUser(supabase, user.id, stats)

    return NextResponse.json({ success: true });
}

export async function PUT(request: NextRequest): Promise<NextResponse> {
    const supabase = createClient();

    const { authUserId, claimed }: { authUserId: string; claimed: boolean } = await request.json();

    const { error: updateUserError } = await supabase
        .from(DbTable.PR)
        .update({ claimed })
        .eq("authUserId", authUserId);

    if (updateUserError) {
        console.error(`${DbError.UPDATE}: PR"`, {
            error: JSON.stringify(updateUserError, null, 2),
        });
    }

    return NextResponse.json({ success: true });
}

const getLatestGithubMergedPr = async (
    fetchedAt: string,
    token: string,
    userName: string
): Promise<Issue[]> => {
    const formatedCurrentDate = new Date().toISOString().slice(0, 10);
    const formatedFetchedAt = new Date(fetchedAt).toISOString().slice(0, 10);

    const url = `https://api.github.com/search/issues?q=type:pr+author:${userName}+updated:${formatedFetchedAt}..${formatedCurrentDate}`;

    const githubIssuesResponse = await fetch(url, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    const githubIssues: GithubIssue = await githubIssuesResponse.json();

    return githubIssues.items.filter((pr) => pr.pull_request.merged_at !== null);
};

const getUserDetails = async (supabase: SupabaseClient, userId: string): Promise<Pick<User, 'fetchedAt' | 'stats' | 'token' | 'username'>> => {
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

const getPrNotSavedInDb = async (supabase: SupabaseClient, userId: string, githubPr: Issue[]): Promise<Issue[]> => {
    const { data: dbPr } = await supabase
        .from(DbTable.PR)
        .select("prId")
        .eq("authUserId", userId)
        .in(
            "prId",
            githubPr.map((pr) => pr.id)
        );
    const dbPrIds = dbPr?.map((pr: { prId: number }) => pr.prId) ?? [];

    /* Exclude PR already saved in DB */
    return githubPr.filter((pr) => !dbPrIds.includes(pr.id));
}

const insertNewPr = async (supabase: SupabaseClient, userId: string, prToSave: Issue[]) => {
    const { error } = await supabase.from(DbTable.PR).insert(
        prToSave.map((pr) => ({
            authUserId: userId,
            claimed: false,
            prType: getPrType(pr.title),
            mergedAt: pr.pull_request.merged_at,
            prId: pr.id,
            prNumber: pr.number,
        }))
    );

    if (error) {
        console.error(`${DbError.INSERT}: PR"`, { error });
    }
}

const updateUser = async (supabase: SupabaseClient, userId: string, stats: Stats) => {
    const { data: claimedCount } = await supabase
        .from(DbTable.PR)
        .select("claimed, claimed.count()")
        .eq("authUserId", userId);

    if (!claimedCount) {
        throw new Error("No PR found");
    }

    let prToClaim = 0;
    let prClaimed = 0;

    claimedCount.forEach(pr => {
        if (pr.claimed) {
            prClaimed = pr.count
        } else {
            prToClaim = pr.count
        }
    })

    /* Update user */
    const updatedUser = {
        fetchedAt: new Date().toISOString(),
        prToClaim,
        stats: {
            ...stats,
            [Resource.PR]: {
                ...stats.pr,
                user: (prToClaim + prClaimed) ?? 0
            }
        },
    } as UserDb;

    const { error: updateUserError } = await supabase
        .from(DbTable.USER)
        .update(updatedUser)
        .eq("authUserId", userId);

    if (updateUserError) {
        console.error(`${DbError.UPDATE}: USER"`, {
            error: JSON.stringify(updateUserError, null, 2),
        });
    }
}