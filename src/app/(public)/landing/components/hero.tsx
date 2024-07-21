"use client";

import { gradientBg, gradientText } from "@/app/(app)/ui";
import { useEffect, useRef } from "react";

import Image from "next/image";
import JSConfetti from "js-confetti";
import Link from "next/link";
import { classNames } from "@/utils";

export const Hero = () => {
  return (
    <div className="md:flex items-center justify-between gap-x-4">
      <div className="flex-1">
        <div className="text-5xl font-extrabold text-center md:text-left text-slate-700">
          <h1>Gamify your</h1>
          <h2 className={classNames(gradientText, gradientBg, "text-5xl pt-2")}>
            Github experience !
          </h2>
        </div>
        <p className="mt-4 text-center md:text-left text-lg">
          Earn rewards for your contributions, collect unique emojis, and level
          up your coding journey.
        </p>

        <div className="mt-12 flex items-center justify-center md:justify-start">
          <Link
            href="/login"
            className="uppercase text-base bg-slate-800 hover:bg-slate-600 text-slate-100 rounded-md px-12 py-4"
          >
            Gamify my Github
          </Link>
        </div>
      </div>

      <div className="mt-16 md:mt-0 flex-1">
        <div className="flex items-start justify-end">
          <p className="mt-2">Click me !</p>
          <Image
            src="/arrow.png"
            width={75}
            height={75}
            alt="pointing arrow"
            className="-ml-4 mr-12 -mb-4 md:-mb-8 md:mr-20"
          />
        </div>
        <PrToClaim />
      </div>
    </div>
  );
};

const PrToClaim = () => {
  const jsConfetti = useRef<JSConfetti | null>(null);

  useEffect(() => {
    jsConfetti.current = new JSConfetti();
  }, []);

  const handleClaimPr = () => {
    jsConfetti.current && jsConfetti.current.addConfetti();
  };

  return (
    <div className="bg-white rounded-lg p-4 md:p-8 shadow-lg">
      <div className="flex items-center justify-between">
        <p className="text-xl font-medium text-left">3 new PR merged !</p>
        <button
          onClick={handleClaimPr}
          className={classNames(
            gradientBg,
            "text-white py-1 px-4 rounded-md text-base text-right animate-bounce"
          )}
        >
          + 120 XP
        </button>
      </div>
    </div>
  );
};
