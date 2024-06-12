import { ClaimPrizeItem } from "./components/claimPrizeItem";
import { Kingdom } from "./components/kingdom";

export default function Home() {
  return (
    <div>
      <div className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-x-4">
        <div className="mt-20 sm:mt-0 col-span-1 sm:col-span-2 order-2 sm:order-1">
          <Kingdom />
        </div>

        <div className="col-span-1 border border-slate-300 rounded-2xl order-1 sm:order-2">
          <ClaimPrizeItem title="12 PR milestone 📍" prize={10} />
          <ClaimPrizeItem title="Documentation guru 📝" prize={50} />
        </div>
      </div>
    </div>
  );
}
