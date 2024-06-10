import { classNames } from "@/utils";

export interface KingdomCellInterface {
  icon: string;
  size: number;
}

export const KingdomCell = ({
  cell,
  className,
}: {
  cell?: KingdomCellInterface;
  className?: string;
}) => {
  return (
    <div
      className={classNames(
        className ? className : "",
        "relative flex h-12 w-12 sm:h-24 sm:w-24 items-center justify-center border-[1px] border-br border-dashed border-slate-300 bg-slate-700"
      )}
    >
      {cell ? (
        <div>
          <p
            className={classNames(
              cell.size === 1 ? "text-base sm:text-xl" : "",
              cell.size === 2 ? "text-base sm:text-4xl" : "",
              cell.size === 3 ? "text-base sm:text-6xl" : ""
            )}
          >
            {cell.icon}
          </p>
          <p className="text-normal absolute bottom-1 right-1 text-slate-500">
            {cell.size}
          </p>
        </div>
      ) : undefined}
    </div>
  );
};
