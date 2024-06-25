import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";
import { getUserDetails } from "../utils/github";
import { DbEvent, Event, EventTypes, eventTypes } from "../interfaces/github";
import { DbError, DbTable } from "../interfaces/database";
import { Resource, UserDb } from "../interfaces/user";

export async function GET(request: NextRequest): Promise<NextResponse> {
    /* Fetch user data from DB */
    const supabase = createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        throw new Error("User is not connected");
    }

    const { stats,
        token, username } = await getUserDetails(supabase, user.id)

    const events = await getLatestEvents(token, username)

    const { data: dbEvents } = await supabase
        .from(DbTable.EVENT)
        .select("eventId")
        .eq("authUserId", user.id)
        .in(
            "eventId",
            events.map(({ id }) => id)
        );
    const dbEventIds = dbEvents?.map((event: { eventId: string }) => event.eventId) ?? [];

    const isEventPrApproved = (event: Event) => event.type === EventTypes.PULL_REQUEST_REVIEW_EVENT && event.payload.review.state === "approved"
    const isEventPrCommented = (event: Event) => event.type === EventTypes.PULL_REQUEST_REVIEW_EVENT

    const eventsToSave: DbEvent[] = events
        .filter((event) => isEventPrApproved(event) || isEventPrCommented(event))
        .filter((event) => !dbEventIds.includes(event.id))
        .map(event => ({
            authUserId: user.id,
            createdAt: event.created_at,
            eventId: event.id,
            prId: event.payload.pull_request.id,
            type: isEventPrCommented(event) ? "comments" : "approves",
        }));

    const { error } = await supabase.from(DbTable.EVENT).insert(eventsToSave);

    if (error) {
        console.error(`${DbError.INSERT}: EVENT"`, { error });
    }

    const { data: eventTypeCount } = await supabase
        .from(DbTable.EVENT)
        .select("type, type.count()")
        .eq("authUserId", user.id);

    if (!eventTypeCount) {
        throw new Error("No events found");
    }

    // Reformat prTypeCount to be search O(1)
    const formatedPrTypeCount = eventTypeCount.reduce((acc, current) => {
        return { ...acc, [current.type]: current.count }
    }, {} as Record<"comments" | "approves", number>)

    /* Update user */
    const updatedUser = {
        stats: {
            ...stats,
            [Resource.APPROVES]: {
                ...stats.approves,
                user: formatedPrTypeCount.approves ?? 0
            },
            [Resource.COMMENTS]: {
                ...stats.comments,
                user: formatedPrTypeCount.comments ?? 0
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

    return NextResponse.json({ success: true });
}

// TODO: handle multiple pages
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



