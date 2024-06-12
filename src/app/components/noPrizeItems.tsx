import { PiCode } from "react-icons/pi";

export const NoPrizeItem = () => {
  return (
    <div className="w-full rounded-lg border-2 border-dashed border-gray-300 p-12">
      <div className="flex items-center justify-center">
        <PiCode className="h-8 w-8" />
      </div>
      <p className="mt-4 block text-base text-center">
        Get back to coding, all prizes have been{" "}
        <span className="text-red-400">claimed</span> 🤙🏼
      </p>
    </div>
  );
};
