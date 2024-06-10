import { ContinueButton } from "./components/continueButton";
import { Kingdom } from "./components/kingdom";

export default function Home() {
  return (
    <div>
      <div className="mt-20">
        <Kingdom />
      </div>

      <div className="mt-12">
        <ContinueButton />
      </div>
    </div>
  );
}
