import Link from "next/link";
import { classNames } from "@/utils";
import { gradientBg } from "@/app/(app)/ui";

export const Navbar = () => {
  return (
    <div>
      <div className="flex items-center justify-between text-lg py-4">
        <Link href="/landing" className="text-2xl">
          🦁
        </Link>

        <div className="flex items-center justify-end gap-x-4 lg:gap-x-24">
          <div className="flex items-center justify-center gap-x-4 lg:gap-x-8">
            <Link href="#features">Features</Link>
            <Link href="#how-it-works">How it works</Link>
            <Link href="#faq">FAQ</Link>
          </div>

          <Link
            href="/login"
            className="bg-slate-800 hover:bg-slate-600 text-slate-100 rounded-md px-4 py-1"
          >
            Login
          </Link>
        </div>
      </div>
      <hr className={classNames(gradientBg, "flex-grow h-1 rounded-full")}></hr>
    </div>
  );
};
