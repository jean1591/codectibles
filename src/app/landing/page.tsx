import { Features } from "./components/features";
import { Hero } from "./components/hero";
import { HowItWorks } from "./components/howItWorks";

export default function Landing() {
  return (
    <div className="mt-24 md:mt-32">
      <Hero />
      <div className="mt-24 md:mt-32">
        <Features />
      </div>
      <div className="mt-24 md:mt-32">
        <HowItWorks />
      </div>
    </div>
  );
}
