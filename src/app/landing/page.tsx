import { Features } from "./components/features";
import { Hero } from "./components/hero";

export default function Landing() {
  return (
    <div className="mt-24">
      <Hero />
      <div className="mt-24 md:mt-32">
        <Features />
      </div>
    </div>
  );
}
