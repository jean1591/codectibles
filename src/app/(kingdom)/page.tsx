import { ActivityFeed } from "../components/activityFeed";
import { Kingdom } from "../components/kingdom";
import { RewardsModal } from "../components/rewardsModal";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function Home() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    redirect("/login");
  }

  return (
    <div>
      <Kingdom />

      <div className="mt-16">
        <ActivityFeed />
      </div>

      <RewardsModal />
    </div>
  );
}
