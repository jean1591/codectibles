import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { type CookieOptions, createServerClient } from "@supabase/ssr";
import { DbError, DbTable } from "@/app/api/interfaces/database";
import { ActivityType } from "../../interfaces/activity";
import { SupabaseClient } from "@supabase/supabase-js";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);

  const code = searchParams.get("code");
  // if "next" is in param, use it as the redirect URL
  const next = searchParams.get("next") ?? "/";

  if (code) {
    const cookieStore = cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value;
          },
          set(name: string, value: string, options: CookieOptions) {
            cookieStore.set({ name, value, ...options });
          },
          remove(name: string, options: CookieOptions) {
            cookieStore.delete({ name, ...options });
          },
        },
      }
    );
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    const {
      data: { user: authUser },
    } = await supabase.auth.getUser();

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

    if (!error) {
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
