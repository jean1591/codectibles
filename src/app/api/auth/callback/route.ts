import { DbError, DbTable } from "@/app/api/interfaces/database";
import { PostgrestError, SupabaseClient } from "@supabase/supabase-js";

import { ActivityType } from "../../interfaces/activity";
import { NextResponse } from "next/server";
import { UserDb } from "../../interfaces/user";
import { createClient } from "@/utils/supabase/server";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");

  if (code) {
    const supabase = createClient();
    const {
      data: { user: authUser },
      error: exchangeError,
    } = await supabase.auth.exchangeCodeForSession(code);

    if (!authUser) {
      throw new Error("User is not connected");
    }

    const { data: users } = await supabase
      .from(DbTable.USER)
      .select("id")
      .eq("authUserId", authUser.id);

    if (!users || users.length === 0) {
      await createUser({
        authUserId: authUser.id,
        supabase,
        username: authUser.user_metadata.user_name,
      });
    }

    if (!exchangeError) {
      return NextResponse.redirect(process?.env?.NEXT_PUBLIC_SITE_URL!);
    }
  }

  // return the user to an error page with instructions
  return NextResponse.redirect(`${origin}/auth/auth-code-error`);
}

const createUser = async ({
  authUserId,
  supabase,
  username,
}: {
  authUserId: string;
  supabase: SupabaseClient;
  username: string;
}) => {
  const { data: users, error: insertUserError } = await supabase
    .from(DbTable.USER)
    .insert({
      authUserId,
      username,
    })
    .select();

  if (insertUserError) {
    console.error(`${DbError.INSERT}: USER"`, { error: insertUserError });

    throw new Error(
      "An error occured during user account creation - Please try again"
    );
  }

  if (users && users.length > 0) {
    const user = users[0] as UserDb;

    const { error: insertStatError } = await supabase
      .from(DbTable.STAT)
      .insert(generateInitialStats(user.id));

    if (insertStatError) {
      console.error(`${DbError.INSERT}: STAT"`, { error: insertStatError });
    }

    const { error: insertActivityError } = await supabase
      .from(DbTable.ACTIVITY)
      .insert({
        authUserId,
        details: "account",
        type: ActivityType.ACCOUNT_CREATED,
        userId: user.id,
      });

    if (insertActivityError) {
      console.error(`${DbError.INSERT}: ACTIVITY"`, {
        error: insertActivityError,
      });
    }
  }
};

const generateInitialStats = (userId: string) => [
  {
    nextMilestone: 1,
    previousMilestone: 0,
    reward: 100,
    type: "pr",
    userId,
    value: 0,
  },
  {
    nextMilestone: 10,
    previousMilestone: 0,
    reward: 0,
    type: "xp",
    userId,
    value: 0,
  },
  {
    nextMilestone: 1,
    previousMilestone: 0,
    reward: 100,
    type: "approves",
    userId,
    value: 0,
  },
  {
    nextMilestone: 1,
    previousMilestone: 0,
    reward: 100,
    type: "comments",
    userId,
    value: 0,
  },
];
