"use client";

import Link from "next/link";
import { classNames } from "@/utils";
import { navigation } from "./constants";
import { usePathname } from "next/navigation";

export const Navbar = () => {
  const pathname = usePathname();
  const page = pathname.split("/").at(-1);

  return (
    <div className="flex flex-col gap-y-2">
      {navigation.map(({ href, label }) => (
        <Link
          key={label}
          href={href}
          className={classNames(
            page === label
              ? "bg-slate-500 text-white"
              : "bg-none hover:bg-slate-700 text-slate-600 hover:text-slate-100",
            "px-4 py-2 rounded-lg text-base font-medium uppercase"
          )}
        >
          {label}
        </Link>
      ))}
    </div>
  );
};
