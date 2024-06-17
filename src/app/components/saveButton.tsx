"use client";

import { RootState } from "../lib/store/store";
import { useSelector } from "react-redux";

export const SaveButton = () => {
  const { coins, kingdom } = useSelector((state: RootState) => state.kingdom);

  const onSave = async () => {
    fetch("/api/user", {
      method: "PUT",
      body: JSON.stringify({ coins, kingdom }),
      headers: { "Content-Type": "application/json" },
    }).then((res) => res.json());
  };

  return (
    <div className="flex items-center justify-center">
      <button
        className="py-4 bg-blue-500 hover:bg-blue-600 rounded-xl w-full transition ease-in-out duration-500"
        onClick={onSave}
      >
        <p className="text-xl">Save kingdom</p>
      </button>
    </div>
  );
};
