import Link from "next/link";
import { classNames } from "@/utils";
import { gradientBg } from "@/app/(app)/ui";

export const LastCta = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="bg-slate-800 text-slate-100 px-16 md:px-28 py-8 rounded-lg shadow-lg">
        <p className="text-center text-lg font-medium">
          Start collecting today
        </p>

        <div className="mt-8 flex items-center justify-center">
          <Link
            href="/login"
            className={classNames(
              gradientBg,
              "uppercase text-slate-100 px-8 py-4 md:px-12 md:py-4 rounded-md shadow-md text-sm md:text-base text-center font-medium"
            )}
          >
            Gamify my Github
          </Link>
        </div>
      </div>
    </div>
  );
};
