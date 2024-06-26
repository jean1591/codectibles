"use client";

import Link from "next/link";

import { classNames } from "@/utils";
import { usePathname } from "next/navigation";
import { navigation } from "./constants";

export const NavbarFooter = () => {
  const pathname = usePathname();
  const page = pathname.split("/").at(-1);

  return (
    <div className="flex items-center justify-center gap-x-2 bg-slate-300 w-full text-sm">
      {navigation.map(({ href, label }) => (
        <Link
          key={label}
          href={href}
          className={classNames(
            page === label
              ? "bg-slate-700 text-slate-100"
              : "bg-none hover:bg-slate-700 text-slate-600 hover:text-slate-100",
            "p-4 font-medium uppercase"
          )}
        >
          {label}
        </Link>
      ))}
      <p className={classNames("p-4 text-slate-400 font-medium uppercase")}>
        pets
      </p>
    </div>
  );
};
