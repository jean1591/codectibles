import { DbError, DbTable } from "../interfaces/database";
import {
  DbEvent,
  Event,
  EventTypes,
  GithubIssue,
  Issue,
  eventTypes,
} from "../interfaces/github";
import { NextRequest, NextResponse } from "next/server";
import { Resource, UserDb } from "../interfaces/user";

import { SupabaseClient } from "@supabase/supabase-js";
import { createClient } from "@/utils/supabase/server";
import { getPrType } from "../utils/github";
import { getUserByAuthUserId } from "../utils/user";

export async function GET(request: NextRequest): Promise<NextResponse> {
  /* Fetch user data from DB */
  const supabase = createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session || !session.user) {
    throw new Error("User is not connected");
  }

  const { user: authUser } = session;

  const {
    fetchedAt,
    id: userId,
    token,
    username,
  } = await getUserByAuthUserId(supabase, authUser.id, true);

  /* PR */
  const githubPr = await getLatestGithubMergedPr(fetchedAt, token, username);
  const prToSave = await getPrNotSavedInDb(supabase, userId, githubPr);
  await insertNewPr(supabase, userId, prToSave);

  /* EVENTS */
  const events = await getLatestEvents(token, username);
  const eventsToSave = await getEventsNotSavedInDb(supabase, userId, events);
  await insertNewEvents(supabase, eventsToSave);

  /* USER */
  await updateUser(supabase, userId);

  return NextResponse.json({ success: true });
}

export async function PUT(request: NextRequest): Promise<NextResponse> {
  const supabase = createClient();

  const { userId, claimed }: { userId: string; claimed: boolean } =
    await request.json();

  const { error: updateUserError } = await supabase
    .from(DbTable.PR)
    .update({ claimed })
    .eq("userId", userId);

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

const getPrNotSavedInDb = async (
  supabase: SupabaseClient,
  userId: string,
  githubPr: Issue[]
): Promise<Issue[]> => {
  const { data: dbPr } = await supabase
    .from(DbTable.PR)
    .select("prId")
    .eq("userId", userId)
    .in(
      "prId",
      githubPr.map((pr) => pr.id)
    );
  const dbPrIds = dbPr?.map((pr: { prId: number }) => pr.prId) ?? [];

  /* Exclude PR already saved in DB */
  return githubPr.filter((pr) => !dbPrIds.includes(pr.id));
};

const insertNewPr = async (
  supabase: SupabaseClient,
  userId: string,
  prToSave: Issue[]
) => {
  const { error } = await supabase.from(DbTable.PR).insert(
    prToSave.map((pr) => ({
      claimed: false,
      prType: getPrType(pr.title),
      mergedAt: pr.pull_request.merged_at,
      prId: pr.id,
      prNumber: pr.number,
      userId,
    }))
  );

  if (error) {
    console.error(`${DbError.INSERT}: PR"`, { error });
  }
};

const updateUser = async (supabase: SupabaseClient, userId: string) => {
  /* PR */
  const { data: claimedCount } = await supabase
    .from(DbTable.PR)
    .select("claimed, claimed.count()")
    .eq("userId", userId);

  if (!claimedCount) {
    throw new Error("No PR found");
  }

  let prToClaim = 0;
  let prClaimed = 0;

  claimedCount.forEach((pr) => {
    if (pr.claimed) {
      prClaimed = pr.count;
    } else {
      prToClaim = pr.count;
    }
  });

  /* Events */
  const { data: eventTypeCount } = await supabase
    .from(DbTable.EVENT)
    .select("type, type.count()")
    .eq("userId", userId);

  if (!eventTypeCount) {
    throw new Error("No events found");
  }

  // Reformat eventTypeCount to be search O(1)
  const formatedEventTypeCount = eventTypeCount.reduce((acc, current) => {
    return { ...acc, [current.type]: current.count };
  }, {} as Record<"comments" | "approves", number>);

  /* User */
  const updatedUser = {
    fetchedAt: new Date().toISOString(),
    prToClaim,
  } as UserDb;

  const { error: updateUserError } = await supabase
    .from(DbTable.USER)
    .update(updatedUser)
    .eq("id", userId);

  if (updateUserError) {
    console.error(`${DbError.UPDATE}: USER"`, {
      error: JSON.stringify(updateUserError, null, 2),
    });
  }

  /* Stats */
  const { data: statsDb } = await supabase
    .from(DbTable.STAT)
    .select("*")
    .eq("userId", userId);

  const updatedStats = [
    {
      ...statsDb?.find((stat) => stat.type === Resource.PR),
      value: prToClaim + prClaimed ?? 0,
    },
    {
      ...statsDb?.find((stat) => stat.type === Resource.APPROVES),
      value: formatedEventTypeCount.approves ?? 0,
    },
    {
      ...statsDb?.find((stat) => stat.type === Resource.COMMENTS),
      value: formatedEventTypeCount.comments ?? 0,
    },
  ];

  const { error: updateStatsError } = await supabase
    .from(DbTable.STAT)
    .upsert(updatedStats, {
      onConflict: "id",
      ignoreDuplicates: false,
      defaultToNull: false,
    })
    .eq("userId", userId);

  if (updateStatsError) {
    console.error(`${DbError.UPDATE}: STAT"`, {
      error: JSON.stringify(updateUserError, null, 2),
    });
  }
};

const getLatestEvents = async (
  token: string,
  username: string
): Promise<Event[]> => {
  const url = `https://api.github.com/users/${username}/events`;

  const eventsResponse = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const events: Event[] = await eventsResponse.json();

  return events.filter(({ type }) => eventTypes.includes(type));
};

const isEventPrApproved = (event: Event) =>
  event.type === EventTypes.PULL_REQUEST_REVIEW_EVENT &&
  event.payload.review.state === "approved";
const isEventPrCommented = (event: Event) =>
  event.type === EventTypes.PULL_REQUEST_REVIEW_COMMENT_EVENT;

const getEventsNotSavedInDb = async (
  supabase: SupabaseClient,
  userId: string,
  events: Event[]
): Promise<DbEvent[]> => {
  const { data: dbEvents } = await supabase
    .from(DbTable.EVENT)
    .select("eventId")
    .eq("userId", userId)
    .in(
      "eventId",
      events.map(({ id }) => id)
    );
  const dbEventIds =
    dbEvents?.map((event: { eventId: string }) => event.eventId) ?? [];

  return events
    .filter((event) => isEventPrApproved(event) || isEventPrCommented(event))
    .filter((event) => !dbEventIds.includes(event.id))
    .map((event) => ({
      createdAt: event.created_at,
      eventId: event.id,
      prId: event.payload.pull_request.id,
      type: isEventPrCommented(event) ? "comments" : "approves",
      userId,
    }));
};

const insertNewEvents = async (
  supabase: SupabaseClient,
  eventsToSave: DbEvent[]
) => {
  const { error } = await supabase.from(DbTable.EVENT).insert(eventsToSave);

  if (error) {
    console.error(`${DbError.INSERT}: EVENT"`, { error });
  }
};
