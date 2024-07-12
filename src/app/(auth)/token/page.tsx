"use client";

import { gradientBg, gradientText } from "@/app/(app)/ui";

import Image from "next/image";
import { classNames } from "@/utils";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function TokenPage() {
  const { push } = useRouter();
  const [token, setToken] = useState<string | null>(null);

  const onSaveToken = async () => {
    fetch("/api/auth/token", {
      method: "PUT",
      body: JSON.stringify({ token }),
      headers: { "Content-Type": "application/json" },
    }).then((res) => res.json());

    push("/");
  };

  return (
    <div className="w-full">
      <div>
        <h2 className="text-center text-2xl font-bold leading-9 tracking-tight">
          Save new Github token to access{" "}
          <span className={classNames(gradientText, gradientBg)}>
            Codectibles
          </span>
        </h2>

        <p className="mt-8 text-center text-lg font-medium leading-5 tracking-tight">
          Your token will be encrypted before being saved in DB
        </p>

        <div className="mt-8 flex items-center justify-center">
          <Image
            className="rounded-md w-auto"
            priority={true}
            src="/token-scope.png"
            width={500}
            height={500}
            alt="Github token scope"
          />
        </div>
        <div className="mt-8 text-center ">
          <a
            href="https://github.com/settings/tokens"
            target="_blank"
            className="text-lg text-slate-800 border-b border-slate-800 hover:border-b-2 hover:font-semibold"
          >
            Get a new token here
          </a>
        </div>

        <div className="mt-8 w-full md:flex items-center justify-center gap-x-8 border border-slate-800 rounded-lg p-4">
          <div className="flex-1 text-base">
            <input
              onChange={(e) => {
                setToken(e.target.value);
              }}
              type="text"
              id="token"
              className="w-full bg-white p-2 placeholder:text-slate-600 rounded-lg"
              placeholder="ghp_whgD..."
            />
          </div>

          <div className="flex-1 flex items-center justify-center">
            <button
              className="mt-4 md:mt-0 w-full flex items-center justify-center gap-x-2 rounded-md bg-slate-800 hover:bg-slate-700 px-4 py-2 text-base font-semibold leading-6 text-slate-300"
              onClick={onSaveToken}
            >
              <p className="text-base">Save new token</p>
            </button>
          </div>
        </div>
      </div>

      <div className="mt-8 md:mt-16 text-left">
        <p className="text-xl font-medium leading-5 tracking-tight">
          Why the need for a token with a{" "}
          <span className="text-red-700 font-bold">repo</span> access ?
        </p>
        <p className="mt-4 text-lg">
          Github requires a repo token to access your repository data and track
          your activity. This token allows us to fetch information about your
          pull requests in both public and private repo. Without it, we can't
          properly reward your contributions. Unfortunately, Github does not
          provide an alternative method for us to access this data without
          having access to all your code.
        </p>
        <p className="mt-8 text-xl font-medium leading-5 tracking-tight">
          How is your <span className="text-red-700 font-bold">token</span>{" "}
          handled ?
        </p>
        <p className="mt-4 text-lg">
          Your token is encrypted as if it were a password before being saved in
          DB. We do not use your token for other purposes than getting your
          latest activities, we only use metadata such as id and dates.
        </p>
      </div>
    </div>
  );
}
