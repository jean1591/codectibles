"use client";

import { PiGithubLogo } from "react-icons/pi";
import { createClient } from "@/utils/supabase/client";
import { classNames } from "@/utils";
import { gradientBg } from "@/app/(app)/ui";

const getURL = () => {
  let url =
    process?.env?.NEXT_PUBLIC_SITE_URL ?? // Set this to your site URL in production env.
    process?.env?.NEXT_PUBLIC_VERCEL_URL ?? // Automatically set by Vercel.
    'http://localhost:3000/'
  // Make sure to include `https://` when not localhost.
  url = url.startsWith('http') ? url : `https://${url}`
  // Make sure to include a trailing `/`.
  url = url.endsWith('/') ? url : `${url}/`
  return url
}

async function signInWithGithub() {
  const supabase = createClient();

  await supabase.auth.signInWithOAuth({
    provider: "github",
    options: {
      redirectTo: getURL(),
    },
  });
}

export default function LoginPage() {
  return (
    <div>
      <div className="flex min-h-full flex-1 items-center justify-center py-12">
        <div className="w-full max-w-sm space-y-10 text-2xl font-bold text-center leading-9 tracking-tight">
          <h2>
            Sign in to{" "}
            <span
              className={classNames(
                gradientBg,
                "inline-block text-transparent bg-clip-text"
              )}
            >
              Code Zoo
            </span>
          </h2>

          <button
            onClick={signInWithGithub}
            className="w-full flex items-center justify-center gap-x-2 rounded-md bg-slate-800 hover:bg-slate-700 px-4 py-2 text-base font-semibold leading-6 text-slate-300"
          >
            <PiGithubLogo className="h-6 w-6" />
            Github
          </button>
        </div>
      </div>
    </div>
  );
}
