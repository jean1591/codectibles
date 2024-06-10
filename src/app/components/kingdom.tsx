import { classNames } from "@/utils";
import { ReactNode } from "react";

const GRID_SIZE = 7;

const formatGrid = (index: number): string | undefined => {
  if (index === 0) {
    return "rounded-tl-3xl";
  }

  if (index === GRID_SIZE - 1) {
    return "rounded-tr-3xl";
  }

  if (index === GRID_SIZE ** 2 - GRID_SIZE) {
    return "rounded-bl-3xl";
  }

  if (index === GRID_SIZE ** 2 - 1) {
    return "rounded-br-3xl";
  }
};

interface KingdomType {
  icon: string;
  size: number;
}

const kingdom: (KingdomType | undefined)[] = [
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  { icon: "🌾", size: 2 },
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  { icon: "🌾", size: 1 },
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  { icon: "🏰", size: 3 },
  undefined,
  undefined,
  { icon: "🌾", size: 1 },
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  { icon: "🌾", size: 2 },
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
];

export const Kingdom = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="grid grid-cols-7">
        {kingdom.map((cell, index) => (
          <KingdomCell className={formatGrid(index)}>
            {cell ? (
              <div>
                <p className={classNames(
                    cell.size === 1 ? "text-xl" : "",
                    cell.size === 2 ? "text-3xl" : "",
                    cell.size === 3 ? "text-6xl" : "",
                    )}>{cell.icon}</p>
                <p className="text-normal absolute bottom-1 right-1 text-slate-500">
                  {cell.size}
                </p>
              </div>
            ) : undefined}
          </KingdomCell>
        ))}
      </div>
    </div>
  );
};

const KingdomCell = ({
  children,
  className,
}: {
  children?: ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={classNames(
        className ? className : "",
        "relative flex h-12 w-12 sm:h-24 sm:w-24 items-center justify-center border-[1px] border-br border-dashed border-slate-300 bg-slate-700"
      )}
    >
      {children}
    </div>
  );
};
