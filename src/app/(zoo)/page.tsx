import { RewardsModal } from "../components/rewardsModal";
import { SaveButton } from "../components/saveButton";
import { Zoo } from "../components/zoo";
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
      <Zoo />

      <div className="mt-8">
        <SaveButton />
      </div>

      <RewardsModal />
    </div>
  );
}