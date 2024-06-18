"use client";

import Link from "next/link";
import { PiSignOut } from "react-icons/pi";
import { RewardButton } from "./getRewardsButton";
import { RootState } from "../lib/store/store";
import { createClient } from "@/utils/supabase/client";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

export const Navbar = () => {
  const [animation, setAnimation] = useState('')
  const supabase = createClient();

  const { coins } = useSelector((state: RootState) => state.zoo);

  const onSignOut = async () => {
    await supabase.auth.signOut();
  };

  useEffect(() => {
    setAnimation('scale-125 text-red-500 transition ease-in-out duration-200');
    const timer = setTimeout(() => {
      setAnimation('');
    }, 200);
    return () => clearTimeout(timer);
  }, [coins]);

  return (
    <div className="px-4 md:px-0 py-4 mx-auto max-w-3xl flex items-center justify-between border-b border-slate-300 text-base sm:text-xl font-medium">
      <div>Code Zoo 🦁</div>
      <div className="flex items-center justify-end gap-x-4 sm:gap-x-8 text-sm sm:text-xl">
        <div className={animation}>{coins} 💎</div>
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
