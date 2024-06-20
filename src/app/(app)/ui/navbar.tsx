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
          "hover:bg-slate-800 px-4 py-2 rounded-lg text-slate-300 text-base font-medium uppercase"
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

export const NavbarSmallScreen = () => {
  return (
    <div className="grid grid-cols-2 bg-slate-700 py-4">
      <Link
        href="/profile"
        className="rounded-lg text-slate-200 text-center text-base font-medium capitalize"
      >
        profile
      </Link>

      <p className="rounded-lg text-slate-200 text-center text-base font-medium capitalize">
        pets
      </p>
    </div>
  );
};
