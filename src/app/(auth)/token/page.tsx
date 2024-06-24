"use client";

import { gradientBg } from "@/app/(app)/ui";
import { classNames } from "@/utils";
import Image from "next/image";
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
    <div className="w-full sm:w-2/3">
      <h2 className="text-center text-2xl font-bold leading-9 tracking-tight">
        Save new Github token to access{" "}
        <span
          className={classNames(
            gradientBg,
            "inline-block text-transparent bg-clip-text"
          )}
        >
          Code Zoo
        </span>
      </h2>

      <p className="mt-8 text-center text-lg font-medium leading-5 tracking-tight">
        Your token will be encrypted before being saved in DB
      </p>

      <div className="mt-8">
        <Image
          className="rounded-md w-auto"
          priority={true}
          src="/token-scope.png"
          width={500}
          height={500}
          alt="Github token scope"
        />
      </div>

      <div className="mt-8 rounded-md px-3 pb-1.5 pt-2.5 shadow-sm ring-1 ring-inset ring-slate-800 text-xs sm:text-sm sm:leading-6">
        <label htmlFor="token" className="font-medium">
          Github token
        </label>
        <input
          onChange={(e) => {
            setToken(e.target.value);
          }}
          type="text"
          id="token"
          className="w-full bg-slate-300 border-0 p-0 placeholder:text-slate-600"
          placeholder="ghp_whgD..."
        />
      </div>

      <div className="flex items-center justify-center">
        <button
          className="mt-8 w-full flex items-center justify-center gap-x-2 rounded-md bg-slate-800 hover:bg-slate-700 px-4 py-2 text-base font-semibold leading-6 text-slate-300"
          onClick={onSaveToken}
        >
          <p className="text-base">Save new token</p>
        </button>
      </div>
    </div>
  );
}
