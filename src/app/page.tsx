import { Kingdom } from "./components/kingdom";
import { PrizeButton } from "./components/prizeButton";
import { PrizeModal } from "./components/prizeModal";

export default function Home() {
  return (
    <div>
      <div className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-x-4">
        <div className="mt-20 sm:mt-0 col-span-1 sm:col-span-2 order-2 sm:order-1">
          <Kingdom />
        </div>

        <div className="col-span-1 order-1 sm:order-2">
          <PrizeButton />
        </div>
      </div>

      <PrizeModal />
    </div>
  );
}
