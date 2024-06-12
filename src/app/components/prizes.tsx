import { useSelector } from "react-redux";
import { PrizeItem } from "./prizeItem";
import { RootState } from "../lib/store/store";

export const Prizes = () => {
  const { prizes } = useSelector((state: RootState) => state.prize);

  /* TODO: display message no prizes */
  return (
    <div>
      {prizes.map(({ prize, title }) => (
        <PrizeItem key={title} title={title} prize={prize} />
      ))}
    </div>
  );
};
