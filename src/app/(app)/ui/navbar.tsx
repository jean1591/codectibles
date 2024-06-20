"use client";

import Link from "next/link";

import { classNames } from "@/utils";
import { usePathname } from "next/navigation";

const navigationItems = [
  { title: "profile", href: "/profile" },
  { title: "success", href: "/success" },
  { title: "pets", href: "/pets" },
];

export const Navbar = () => {
  const pathname = usePathname();
  const page = pathname.split("/").at(-1);

  return (
    <div className="flex flex-col gap-y-2">
      {navigationItems.map(({ title, href }) => (
        <Link
          key={title}
          href={href}
          className={classNames(
            page === title ? "bg-slate-800" : "bg-none",
            "hover:bg-slate-800 px-4 py-2 rounded-lg text-slate-300 text-base font-medium uppercase"
          )}
        >
          {title}
        </Link>
      ))}
    </div>
  );
};

export const NavbarSmallScreen = () => {
  return (
    <div className="grid grid-cols-3 bg-slate-700 py-4">
      {navigationItems.map(({ title, href }) => (
        <Link
          key={title}
          href={href}
          className="rounded-lg text-slate-200 text-center text-base font-medium capitalize"
        >
          {title}
        </Link>
      ))}
    </div>
  );
};
