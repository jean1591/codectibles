import { gradientBg, gradientText } from "@/app/(app)/ui";

import { classNames } from "@/utils";

interface TypeFeature {
  title: string;
  description: string;
  icon: string;
}
const features: TypeFeature[] = [
  {
    icon: "🎮",
    title: "Gamified experience",
    description:
      "Transform GitHub into an engaging game with rewards for every merged pull request, approval, and comment.",
  },
  {
    icon: "🦖",
    title: "Collect unique emojis",
    description:
      "Earn coins and collect a variety of animal emojis, from common pets to legendary creatures.",
  },
  {
    icon: "🚀",
    title: "Level up and unlock perks",
    description:
      "Gain experience points (XP) for your contributions and level up to unlock new perks and abilities.",
  },
];

export const Features = () => {
  return (
    <div id="features">
      <div className="text-center">
        <p
          className={classNames(
            gradientText,
            gradientBg,
            "text-4xl font-extrabold"
          )}
        >
          Features
        </p>
        <p className="mt-4 text-lg text-slate-700">
          Enhance your github journey with rewards
        </p>
      </div>

      <div className="mt-8 md:mt-12 md:flex items-start justify-center md:gap-x-12">
        {features.map(({ icon, title, description }) => (
          <div
            key={title}
            className="mt-8 md:mt-0 p-8 bg-white rounded-lg text-left flex-1 shadow-lg"
          >
            <div className="flex md:block items-center justify-start gap-x-8">
              <p className="text-5xl md:text-6xl">{icon}</p>
              <div>
                <p className="mt-4 text-lg font-medium">{title}</p>
                <p className="mt-4 text-base">{description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
