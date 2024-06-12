import { useSelector } from "react-redux";
import { PrizeItem } from "./prizeItem";
import { RootState } from "../lib/store/store";
import { NoPrizeItem } from "./noPrizeItems";

export const Prizes = () => {
  const { prizes } = useSelector((state: RootState) => state.prize);

  return (
    <div>
      {prizes.length ? (
        prizes.map(({ prize, title }) => (
          <PrizeItem key={title} title={title} prize={prize} />
        ))
      ) : (
        <NoPrizeItem />
      )}
    </div>
  );
};
