"use client";

import { useSelector } from "react-redux";

import Link from "next/link";
import { PiSignOut } from "react-icons/pi";
import { RewardButton } from "./getRewardsButton";
import { RootState } from "../lib/store/store";
import { createClient } from "@/utils/supabase/client";

export const Navbar = () => {
  const supabase = createClient();

  const { coins } = useSelector((state: RootState) => state.kingdom);

  const onSignOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <div className="px-4 md:px-0 py-4 mx-auto max-w-3xl flex items-center justify-between border-b border-slate-300 text-base sm:text-xl font-medium">
      <div>Code Kingdom 👑</div>
      <div className="flex items-center justify-end gap-x-4 sm:gap-x-8 text-sm sm:text-xl">
        {coins && <div>{coins} 💎</div>}
        <RewardButton />
        <button onClick={onSignOut}>
          <Link href="/login">
            <PiSignOut className="h-5 w-5 sm:h-6 sm:w-6" />
          </Link>
        </button>
      </div>
    </div>
  );
};
