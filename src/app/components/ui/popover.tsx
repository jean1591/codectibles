import { ReactNode } from "react";
import { classNames } from "@/utils";

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
        selectedCell < 14 ? "top-12 sm:top-20" : "bottom-12 sm:bottom-20",
        selectedCell % 7 === 0 ? "left-8 sm:-left-1/2" : "-left-1/2",
        selectedCell % 7 === 6 || selectedCell % 7 === 5
          ? "-left-40 sm:-left-1/2"
          : "-left-1/2",
        "z-40 absolute bg-slate-800 p-4 rounded-lg w-56 border border-slate-300"
      )}
    >
      {children}
    </div>
  );
};
