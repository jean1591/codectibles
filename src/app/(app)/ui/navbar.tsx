"use client";

import { useDispatch, useSelector } from "react-redux";

import Link from "next/link";
import { setCurrentPage } from "@/app/lib/store/features/navigation/slice";
import { classNames } from "@/utils";
import { RootState } from "@/app/lib/store/store";

export const Navbar = () => {
  const dispatch = useDispatch();
  const {currentPage} = useSelector((state: RootState) => state.navigation)

  const navigationItems = [
    { title: "Profile", href: "/profile" },
    { title: "Success", href: "/success" },
    { title: "Pets", href: "/pets" },
  ];

  return (
    <div className="flex flex-col gap-y-2">
      {navigationItems.map(({ title, href }) => (
        <Link
          key={title}
          onClick={() => dispatch(setCurrentPage(title))}
          href={href}
          className={classNames(
            currentPage === title ? "bg-slate-800" : "bg-none",
            "hover:bg-slate-800 px-4 py-2 rounded-lg text-slate-300 text-lg font-medium uppercase")}
        >
          {title}
        </Link>
      ))}
    </div>
  );
};
