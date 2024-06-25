"use client";

import { RootState } from "@/app/lib/store/store";
import { useSelector } from "react-redux";

export const Banner = () => {
  const { user } = useSelector((state: RootState) => state.user);

  // TODO: display skeleton
  if (!user) {
    return <></>;
  }

  return (
    <div className="py-8 flex items-center justify-between text-lg">
      <p className="font-medium">{`@${user.username}`}</p>
    </div>
  );
};
