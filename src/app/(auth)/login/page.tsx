import { gradientBg, gradientText } from "@/app/(app)/ui";

import { PiGithubLogo } from "react-icons/pi";
import { classNames } from "@/utils";
import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const signIn = async () => {
    "use server";

    const origin = headers().get("origin");

    const supabase = createClient();
    const { error, data } = await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: `${origin}/api/auth/callback`,
      },
    });

    if (error) {
      console.error(error);
    } else {
      return redirect(data.url);
    }
  };

  return (
    <div>
      <div className="flex min-h-full flex-1 items-center justify-center py-12">
        <div className="w-full max-w-sm space-y-10 text-2xl font-bold text-center leading-9 tracking-tight">
          <h2>
            Sign in to{" "}
            <span className={classNames(gradientText, gradientBg)}>
              Codectibles
            </span>
          </h2>

          <form action={signIn}>
            <button className="w-full flex items-center justify-center gap-x-2 rounded-md bg-slate-800 hover:bg-slate-700 px-4 py-2 text-base font-semibold leading-6 text-slate-300">
              <PiGithubLogo className="h-6 w-6" />
              Github
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
