"use client";

import Link from "next/link";

import { classNames } from "@/utils";
import { usePathname } from "next/navigation";

export const Navbar = () => {
  const pathname = usePathname();
  const page = pathname.split("/").at(-1);

  return (
    <div className="flex flex-col gap-y-2">
      <Link
        href="/profile"
        className={classNames(
          page === "profile"
            ? "bg-slate-700 text-slate-100"
            : "bg-none hover:bg-slate-700 text-slate-600 hover:text-slate-100",
          "px-4 py-2 rounded-lg text-base font-medium uppercase"
        )}
      >
        profile
      </Link>
      <Link
        href="/quests"
        className={classNames(
          page === "quests"
          ? "bg-slate-700 text-slate-100"
          : "bg-none hover:bg-slate-700 text-slate-600 hover:text-slate-100",
          "px-4 py-2 rounded-lg text-base font-medium uppercase"
        )}
      >
        Quests
      </Link>

      <p
        className={classNames(
          "px-4 py-2 rounded-lg text-slate-600 text-base font-medium uppercase"
        )}
      >
        pets
      </p>
    </div>
  );
};
