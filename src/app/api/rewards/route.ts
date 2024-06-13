import { NextRequest, NextResponse } from "next/server";
import { githubIssuesMock } from "../mock/github";

const userDetailsDbMock = {
  fetchAt: "2024-06-09",
  nextPrMilestone: 8,
  prCount: 7
}

// Todo: add PR to existings PRs with claimed: false
const prDbMock = {

}

interface Reward {
  prMerged?: number;
  prMilestone?: number;
}

export async function GET(request: NextRequest) {
  // Get data from Github
  const githubIssues = githubIssuesMock

  // Get data from DB
  const userData = userDetailsDbMock

  // Update DB


  const rewards: Reward = {}

  // PR MERGED
  const newPrMerged = githubIssues.items.reduce((acc, current) => {
    const pr = current.pull_request

    if (pr.merged_at !== null) {
      acc += 1
    }

    return acc
  }, 0)

  if (newPrMerged) {
    rewards.prMerged = newPrMerged
  }

  // PR MILESTONE
  const milestoneReached = userData.prCount + newPrMerged > userData.nextPrMilestone

  if (milestoneReached) {
    rewards.prMilestone = userData.nextPrMilestone
  }

  return NextResponse.json(rewards);
}
