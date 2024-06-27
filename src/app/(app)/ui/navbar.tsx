"use client";

import Link from "next/link";

import { classNames } from "@/utils";
import { usePathname } from "next/navigation";
import { navigation } from "./constants";

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
              ? "bg-slate-700 text-slate-100"
              : "bg-none hover:bg-slate-700 text-slate-600 hover:text-slate-100",
            "px-4 py-2 rounded-lg text-base font-medium uppercase"
          )}
        >
          {label}
        </Link>
      ))}
      <p
        className={classNames(
          "px-4 py-2 rounded-lg text-slate-400 text-base font-medium uppercase"
        )}
      >
        collection
      </p>
    </div>
  );
};
