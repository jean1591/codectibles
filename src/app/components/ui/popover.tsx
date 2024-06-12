import { classNames } from "@/utils";
import { ReactNode } from "react";

export const Popover = ({
  children,
  isPopoverVisible,
  selectedCell,
}: {
  children: ReactNode;
  isPopoverVisible: boolean;
  selectedCell: number;
}) => {
  return (
    <div
      className={classNames(
        isPopoverVisible ? "visible" : "hidden",
        selectedCell < 7 ? "top-12 sm:top-20" : "bottom-12 sm:bottom-20",
        selectedCell % 7 === 0 ? "left-8 sm:-left-1/2" : "-left-1/2",
        selectedCell % 7 === 6 ? "-left-40 sm:-left-1/2" : "-left-1/2",
        "z-50 absolute bg-slate-800 p-4 rounded-lg w-48 border border-slate-300"
      )}
    >
      {children}
    </div>
  );
};
