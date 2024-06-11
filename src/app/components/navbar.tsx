"use client"
import { useSelector } from "react-redux";
import { RootState } from "../lib/store/store";

export const Navbar = () => {
  const { coins } = useSelector((state: RootState) => state.kingdom);
  
  return (
    <div className="px-4 md:px-0 py-8 mx-auto max-w-6xl flex justify-between border-b border-slate-300 text-xl font-medium">
      <div>Code Kingdom 👑</div>
      <div className="flex items-center justify-end gap-x-8">
        <div>{coins} 💎</div>
        <div>Log out 👋🏼</div>
      </div>
    </div>
  );
};
