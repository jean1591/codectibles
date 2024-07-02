import { Faq } from "./components/faq";
import { Features } from "./components/features";
import { Hero } from "./components/hero";
import { HowItWorks } from "./components/howItWorks";
import { LastCta } from "./components/lastCta";
import { Pricing } from "./components/pricing";

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
      <div className="mt-24 md:mt-32">
        <Pricing />
      </div>
      <div className="mt-24 md:mt-32">
        <Faq />
      </div>
      <div className="mt-16 md:mt-32">
        <LastCta />
      </div>
    </div>
  );
}
