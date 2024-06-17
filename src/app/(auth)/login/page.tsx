"use client";

import { PiGithubLogo } from "react-icons/pi";
import { createClient } from "@/utils/supabase/client";

async function signInWithGithub() {
  const supabase = createClient();

  await supabase.auth.signInWithOAuth({
    provider: "github",
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/auth/callback`,
    },
  });
}

export default function LoginPage() {
  return (
    <div>
      <div className="flex min-h-full flex-1 items-center justify-center py-12">
        <div className="w-full max-w-sm space-y-10">
          <h2 className="text-center text-2xl font-bold leading-9 tracking-tight">
            Sign in to <span className="text-red-300/75">Code Zoo 👑</span>
          </h2>

          <button
            onClick={signInWithGithub}
            className="w-full flex items-center justify-center gap-x-2 rounded-md bg-slate-200 hover:bg-slate-300 px-4 py-2 text-base font-semibold leading-6 text-slate-900"
          >
            <PiGithubLogo className="h-6 w-6" />
            Github
          </button>
        </div>
      </div>
    </div>
  );
}
