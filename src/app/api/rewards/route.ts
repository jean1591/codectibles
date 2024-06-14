import { NextRequest, NextResponse } from "next/server";

import { GithubIssue, Issue } from "../interfaces/github";
import { createClient } from "@/utils/supabase/server";

const userDetailsDbMock = {
  fetchAt: "2024-06-09",
  nextPrMilestone: 8,
  prCount: 7,
};

interface Reward {
  prMerged?: number;
  prMilestone?: number;
}

export async function GET(request: NextRequest) {
  // Get data from DB
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User is not connected");
  }

  const { data: users } = await supabase
    .from("user")
    .select("*")
    .eq("auth_user_id", user.id);

  if (!users || users.length === 0) {
    throw new Error(`No users found for id ${user.id}`);
  }

  const { fetched_at, token, user_name } = users[0];
  const formatedCurrentDate = new Date().toISOString().slice(0, 10);
  const formatedFetchedAt = new Date(fetched_at).toISOString().slice(0, 10);

  const url = `https://api.github.com/search/issues?q=type:pr+author:${user_name}+updated:${formatedFetchedAt}..${formatedCurrentDate}`;

  const mergedPr = await getLatestGithubMergedPr(url, token);

  const { data: prToRemove } = await supabase
    .from("pr")
    .select("pr_id")
    .eq("user_id", user.id)
    .overlaps(
      "pr_id",
      mergedPr.map((pr) => pr.id)
    );
  const prToRemoveIds = prToRemove?.map((pr: {
    pr_id: number;
  }) => pr.pr_id);

  let prToReward = [...mergedPr];

  if (prToRemoveIds !== undefined) {
    prToReward = mergedPr.filter((pr) => !prToRemoveIds.includes(pr.id));
  }

  const userData = userDetailsDbMock;

  const rewards: Reward = {};

  // PR MERGED
  const newPrMerged = prToReward.reduce((acc, current) => {
    const pr = current.pull_request;

    if (pr.merged_at !== null) {
      acc += 1;
    }

    return acc;
  }, 0);

  if (newPrMerged) {
    rewards.prMerged = newPrMerged;
  }

  // PR MILESTONE
  const milestoneReached =
    userData.prCount + newPrMerged > userData.nextPrMilestone;

  if (milestoneReached) {
    rewards.prMilestone = userData.nextPrMilestone;
  }

  return NextResponse.json(rewards);
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

  return githubIssues.items.filter(
    (pr) => pr.pull_request.merged_at !== null
  );
};
