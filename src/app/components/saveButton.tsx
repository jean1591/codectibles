"use client";

import { RootState } from "../lib/store/store";
import { useSelector } from "react-redux";

export const SaveButton = () => {
  const { coins, zoo } = useSelector((state: RootState) => state.zoo);

  const onSave = async () => {
    fetch("/api/user", {
      method: "PUT",
      body: JSON.stringify({ coins, zoo }),
      headers: { "Content-Type": "application/json" },
    }).then((res) => res.json());
  };

  return (
    <div className="flex items-center justify-center">
      <button
        className="py-4 bg-blue-500 hover:bg-blue-600 rounded-xl w-full transition ease-in-out duration-500"
        onClick={onSave}
      >
        <p className="text-xl">Save zoo</p>
      </button>
    </div>
  );
};
