"use client";

import { createClient } from "@/utils/supabase/client";

async function signInWithGithub() {
  const supabase = createClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "github",
  });
}

export default function LoginPage() {
  return <button onClick={signInWithGithub}>Sign in with Github</button>;
}
