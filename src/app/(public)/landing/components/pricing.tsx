import { gradientBg, gradientText } from "@/app/(app)/ui";

import Link from "next/link";
import { classNames } from "@/utils";

export const Pricing = () => {
  return (
    <div id="pricing">
      <div className="text-center">
        <p
          className={classNames(
            gradientText,
            gradientBg,
            "text-4xl font-extrabold"
          )}
        >
          Pricing
        </p>

        <div className="flex items-center justify-center">
          <p className="mt-4 text-lg text-slate-700 w-2/3">
            The project is free to use at the moment, feel free to pay us a
            coffee by sponsoring us on{" "}
            <Link
              href="https://github.com/sponsors/jean1591"
              target="_blank"
              className="bg-slate-800 hover:bg-slate-600 text-slate-100 px-2 py-1 rounded-md"
            >
              Github
            </Link>{" "}
            if you'd like to help ☕️
          </p>
        </div>
      </div>
    </div>
  );
};
