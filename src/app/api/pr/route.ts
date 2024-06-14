import { GithubIssue, Issue } from "../interfaces/github";
import { NextRequest, NextResponse } from "next/server";

import { createClient } from "@/utils/supabase/server";

export async function GET(request: NextRequest) {
  /* Fetch data from DB */
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User is not connected");
  }

  const { data: users } = await supabase
    .from("user")
    .select("fetched_at, token, user_name")
    .eq("auth_user_id", user.id);

  if (!users || users.length === 0) {
    throw new Error(`No users found for id ${user.id}`);
  }

  const { fetched_at, token, user_name } = users[0];

  /* Fetch data from Github */
  const formatedCurrentDate = new Date().toISOString().slice(0, 10);
  const formatedFetchedAt = new Date(fetched_at).toISOString().slice(0, 10);

  const url = `https://api.github.com/search/issues?q=type:pr+author:${user_name}+updated:${formatedFetchedAt}..${formatedCurrentDate}`;

  const githubPr = await getLatestGithubMergedPr(url, token);

  /* Exclude PR already in saved DB */
  const { data: dbPr } = await supabase
    .from("pr")
    .select("pr_id")
    .eq("user_id", user.id)
    .in(
      "pr_id",
      githubPr.map((pr) => pr.id)
    );
  const dbPrIds = dbPr?.map((pr: { pr_id: number }) => pr.pr_id);

  let prToSave = [...githubPr];

  if (dbPrIds !== undefined) {
    prToSave = githubPr.filter((pr) => !dbPrIds.includes(pr.id));
  }

  /* Insert new PR */
  const { error } = await supabase.from("pr").insert(
    prToSave.map((pr) => ({
      claimed: false,
      merged_at: pr.pull_request.merged_at,
      pr_id: pr.id,
      pr_number: pr.number,
      user_id: user.id,
    }))
  );

  if (error) {
    console.error(error.message, { error });
  }

  return NextResponse.json({ success: true });
}

const getLatestGithubMergedPr = async (
  url: string,
  token: string
): Promise<Issue[]> => {
  const githubIssuesResponse = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const githubIssues: GithubIssue = await githubIssuesResponse.json();

  return githubIssues.items.filter((pr) => pr.pull_request.merged_at !== null);
};