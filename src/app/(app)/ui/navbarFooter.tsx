"use client";

import Link from "next/link";

import { classNames } from "@/utils";
import { usePathname } from "next/navigation";

export const NavbarFooter = () => {
  const pathname = usePathname();
  const page = pathname.split("/").at(-1);

  return (
    <div className="flex items-center justify-center gap-x-2 bg-slate-300 w-full text-sm">
      <Link
        href="/profile"
        className={classNames(
          page === "profile"
            ? "bg-slate-700 text-slate-100"
            : "bg-none hover:bg-slate-700 text-slate-600 hover:text-slate-100",
          "p-4 font-medium uppercase"
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
          "p-4 font-medium uppercase"
        )}
      >
        Quests
      </Link>

      <p
        className={classNames(
          "p-4 text-slate-400 font-medium uppercase"
        )}
      >
        pets
      </p>
    </div>
  );
};
