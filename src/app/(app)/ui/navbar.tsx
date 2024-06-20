"use client";

import Link from "next/link";

import { classNames } from "@/utils";
import { usePathname } from "next/navigation";

export const Navbar = () => {
  const pathname = usePathname()
  const page = pathname.split('/').at(-1)

  const navigationItems = [
    { title: "profile", href: "/profile" },
    { title: "success", href: "/success" },
    { title: "pets", href: "/pets" },
  ];

  return (
    <div className="flex flex-col gap-y-2">
      {navigationItems.map(({ title, href }) => (
        <Link
          key={title}
          href={href}
          className={classNames(
            page === title ? "bg-slate-800" : "bg-none",
            "hover:bg-slate-800 px-4 py-2 rounded-lg text-slate-300 text-base font-medium uppercase")}
        >
          {title}
        </Link>
      ))}
    </div>
  );
};
