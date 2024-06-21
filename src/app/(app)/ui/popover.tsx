import { ReactNode } from "react";
import { classNames } from "@/utils";

export const Popover = ({
  children,
  isPopoverVisible,
}: {
  children: ReactNode;
  isPopoverVisible: boolean;
}) => {
  return (
    <div
      className={classNames(
        isPopoverVisible ? "visible" : "hidden",
        "absolute z-50 top-16 -left-1/2 bg-slate-300 p-2 rounded-lg w-52 border-2 border-slate-500"
      )}
    >
      {children}
    </div>
  );
};
