"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function TokenPage() {
  const { push } = useRouter();
  const [token, setToken] = useState<string | null>(null);

  const onSaveToken = async () => {
    fetch("/api/token", {
      method: "PUT",
      body: JSON.stringify({ token }),
      headers: { "Content-Type": "application/json" },
    }).then((res) => res.json());

    push("/");
  };

  return (
    <div className="w-full sm:w-2/3">
      <div className="rounded-md px-3 pb-1.5 pt-2.5 shadow-sm ring-1 ring-inset ring-slate-300 text-xs sm:text-sm sm:leading-6">
        <label htmlFor="token" className="font-medium">
          Github Token
        </label>
        <input
          onChange={(e) => {
            setToken(e.target.value);
          }}
          type="text"
          id="token"
          className="w-full bg-slate-800 border-0 p-0 placeholder:text-slate-400"
          placeholder="ghp_whgD..."
        />
      </div>

      <div className="flex items-center justify-center">
        <button
          className="mt-8 py-2 bg-blue-500 hover:bg-blue-600 rounded-md w-full transition ease-in-out duration-500"
          onClick={onSaveToken}
        >
          <p className="text-base">Save new token</p>
        </button>
      </div>
    </div>
  );
}
