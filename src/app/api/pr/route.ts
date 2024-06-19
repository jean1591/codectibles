import { DbError, DbTable } from "../interfaces/database";
import { GithubIssue, Issue } from "../interfaces/github";
import { NextRequest, NextResponse } from "next/server";

import { RewardType } from "@/app/interfaces";
import { createClient } from "@/utils/supabase/server";
import { decrypt } from "@/utils/hash";

export async function GET(request: NextRequest): Promise<NextResponse> {
  /* Fetch data from DB */
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User is not connected");
  }

  const { data: users } = await supabase
    .from(DbTable.USER)
    .select("coins, fetched_at, token, user_name, zoo")
    .eq("auth_user_id", user.id);

  if (!users || users.length === 0) {
    throw new Error(`No users found for id ${user.id}`);
  }

  const {
    coins,
    fetched_at: fetchedAt,
    token: hashedToken,
    user_name: userName,
    zoo,
  } = users[0];

  const token = decrypt(hashedToken);

  /* Fetch data from Github */
  const githubPr = await getLatestGithubMergedPr(fetchedAt, token, userName);

  /* Exclude PR already saved in DB */
  const { data: dbPr } = await supabase
    .from(DbTable.PR)
    .select("pr_id")
    .eq("user_id", user.id)
    .in(
      "pr_id",
      githubPr.map((pr) => pr.id)
    );
  const dbPrIds = dbPr?.map((pr: { pr_id: number }) => pr.pr_id);

  let prToSave = [...githubPr];

  if (dbPrIds && dbPrIds.length > 0) {
    prToSave = githubPr.filter((pr) => !dbPrIds.includes(pr.id));
  }

  /* Insert new PR */
  const { error } = await supabase.from(DbTable.PR).insert(
    prToSave.map((pr) => ({
      claimed: false,
      merged_at: pr.pull_request.merged_at,
      pr_id: pr.id,
      pr_number: pr.number,
      user_id: user.id,
    }))
  );

  if (error) {
    console.error(`${DbError.INSERT}: PR"`, { error });
  }

  /* Update user fetched_at */
  const { error: updateUserError } = await supabase
    .from(DbTable.USER)
    .update({ fetched_at: new Date() })
    .eq("auth_user_id", user.id);

  if (updateUserError) {
    console.error(`${DbError.UPDATE}: USER"`, {
      error: JSON.stringify(updateUserError, null, 2),
    });
  }

  return NextResponse.json({ coins, zoo: JSON.parse(zoo), userName });
}

export async function PUT(request: NextRequest): Promise<NextResponse> {
  const { details, reward, type } = await request.json();

  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User is not connected");
  }

  const claimedAt = new Date();

  if (type === RewardType.MERGE) {
    const { error: updatePrError } = await supabase
      .from(DbTable.PR)
      .update({ claimed: true, claimed_at: claimedAt })
      .eq("user_id", user.id)
      .in("pr_id", details);

    if (updatePrError) {
      console.error(`${DbError.UPDATE}: PR"`, {
        error: updatePrError,
      });
    }
  }

  if (type === RewardType.MILESTONE) {
    const { error: updateUserError } = await supabase
      .from(DbTable.USER)
      .update({ next_pr_milestone: details.upperBound })
      .eq("auth_user_id", user.id);

    if (updateUserError) {
      console.error(`${DbError.UPDATE}: USER"`, {
        error: updateUserError,
      });
    }
  }

  const { data: users } = await supabase
    .from(DbTable.USER)
    .select("coins")
    .eq("auth_user_id", user.id);

  if (!users || users.length === 0) {
    throw new Error(`No users found for id ${user.id}`);
  }

  const { coins } = users[0];

  const { error: updateUserError } = await supabase
    .from(DbTable.USER)
    .update({ coins: coins + reward })
    .eq("auth_user_id", user.id);

  if (updateUserError) {
    console.error(`${DbError.UPDATE}: USER"`, {
      error: updateUserError,
    });
  }

  return NextResponse.json({ success: true });
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
