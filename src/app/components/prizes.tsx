import { PrizeItem } from "./prizeItem";

export const Prizes = () => {
  return (
    <div>
      <PrizeItem title="12 PR milestone 📍" prize={10} />
      <PrizeItem title="Documentation guru 📝" prize={50} />
    </div>
  );
};
