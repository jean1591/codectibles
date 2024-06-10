import { KingdomCell, KingdomCellInterface } from "./kingdomCell";

const formatGrid = (index: number): string | undefined => {
  const GRID_SIZE = 7;

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

const kingdom: (KingdomCellInterface | undefined)[] = [
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
  { icon: "🌾", size: 2 },
  { icon: "🌾", size: 3 },
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
          <KingdomCell key={index} cell={cell} className={formatGrid(index)} />
        ))}
      </div>
    </div>
  );
};
