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
          page === "profile" ? "bg-slate-800" : "bg-none",
          "hover:bg-slate-700 px-4 py-2 rounded-lg text-slate-100 text-base font-medium uppercase"
        )}
      >
        profile
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
