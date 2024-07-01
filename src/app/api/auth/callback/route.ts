import { NextResponse } from "next/server";
import { DbError, DbTable } from "@/app/api/interfaces/database";
import { ActivityType } from "../../interfaces/activity";
import { SupabaseClient } from "@supabase/supabase-js";
import { createClient } from "@/utils/supabase/server";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');

  if (code) {
    const supabase = createClient()
    const { data: { user: authUser }, error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);


    if (!authUser) {
      throw new Error("User is not connected");
    }

    const { data: users } = await supabase
      .from(DbTable.USER)
      .select("username")
      .eq("authUserId", authUser.id);

    if (!users || users.length === 0) {
      await createUser(supabase, authUser.id, authUser.user_metadata.user_name)
    }

    if (!exchangeError) {
      return NextResponse.redirect(process?.env?.NEXT_PUBLIC_SITE_URL!);
    }
  }

  // return the user to an error page with instructions
  return NextResponse.redirect(`${origin}/auth/auth-code-error`);
}

const createUser = async (supabase: SupabaseClient, userId: string, username: string) => {
  const { error: insertUserError } = await supabase.from(DbTable.USER).insert({
    authUserId: userId,
    username: username,
  });
  const { error: insertActivityError } = await supabase.from(DbTable.ACTIVITY).insert({
    authUserId: userId,
    type: ActivityType.ACCOUNT_CREATED,
    details: "account"
  });

  if (insertUserError) {
    console.error(`${DbError.INSERT}: USER"`, { error: insertUserError });
  }
  if (insertActivityError) {
    console.error(`${DbError.INSERT}: ACTIVITY"`, { error: insertActivityError });
  }
}
