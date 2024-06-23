import { DbError, DbTable } from "../interfaces/database";
import { GithubIssue, Issue } from "../interfaces/github";
import { NextRequest, NextResponse } from "next/server";

import { createClient } from "@/utils/supabase/server";
import { decrypt } from "@/utils/hash";
import { Resource, UserDb } from "../interfaces/user";
import { getPrType } from "../utils/pr";

export async function GET(request: NextRequest): Promise<NextResponse> {
    /* Fetch user data from DB */
    const supabase = createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        throw new Error("User is not connected");
    }

    const { data: users } = await supabase
        .from(DbTable.USER)
        .select("fetchedAt, stats, token, username")
        .eq("authUserId", user.id);

    if (!users || users.length === 0) {
        throw new Error(`No users found for id ${user.id}`);
    }

    const { fetchedAt, stats,
        token: hashedToken, username,
    } = users[0];

    const token = decrypt(hashedToken);

    /* Fetch merged PR from Github */
    const githubPr = await getLatestGithubMergedPr(fetchedAt, token, username);

    /* Fetch merged PR from DB */
    const { data: dbPr } = await supabase
        .from(DbTable.PR)
        .select("prId")
        .eq("authUserId", user.id)
        .in(
            "prId",
            githubPr.map((pr) => pr.id)
        );
    const dbPrIds = dbPr?.map((pr: { prId: number }) => pr.prId) ?? [];

    /* Exclude PR already saved in DB */
    const prToSave = githubPr.filter((pr) => !dbPrIds.includes(pr.id));

    /* Insert new PR */
    const { error } = await supabase.from(DbTable.PR).insert(
        prToSave.map((pr) => ({
            authUserId: user.id,
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

    const { data: claimedCount } = await supabase
        .from(DbTable.PR)
        .select("claimed, claimed.count()")
        .eq("authUserId", user.id);

    const prCount = claimedCount?.reduce((acc, current) => {
        return acc + current.count
    }, 0)

    /* Update user */
    const updatedUser = {
        fetchedAt: new Date().toISOString(),
        prToClaim: prCount,
        stats: {
            ...stats,
            [Resource.PR]: {
                ...stats.pr,
                user: prCount ?? 0
            }
        },
    } as UserDb;

    const { error: updateUserError } = await supabase
        .from(DbTable.USER)
        .update(updatedUser)
        .eq("authUserId", user.id);

    if (updateUserError) {
        console.error(`${DbError.UPDATE}: USER"`, {
            error: JSON.stringify(updateUserError, null, 2),
        });
    }

    return NextResponse.json({ prToClaimCount: prCount });
}

const getLatestGithubMergedPr = async (
    fetchedAt: Date,
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