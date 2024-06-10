import { KingdomCell, KingdomCellInterface } from "./kingdomCell";

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
          <KingdomCell key={index} cell={cell} index={index} />
        ))}
      </div>
    </div>
  );
};
