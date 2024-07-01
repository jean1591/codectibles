import { classNames } from "@/utils";
import { gradientBg } from "@/app/(app)/ui";

interface Step {
  description: string;
  title: string;
}

const steps: Step[] = [
  {
    title: "Github token 🏃‍➡️",
    description:
      "Create a personal access token from your GitHub account to securely connect with our app.",
  },
  {
    title: "Save it in the app 💾",
    description:
      "Enter your GitHub token in the app to link your GitHub activity with our reward system. Your token is encrypted before being saved in our DB.",
  },
  {
    title: "Merge, comment and approve PR 🧑‍💻",
    description:
      "Continue your regular GitHub workflow by merging pull requests, commenting on issues, and approving PRs.",
  },
  {
    title: "Collect XP and animals 🏆",
    description:
      "Earn coins and experience points (XP) for each contribution, and use them to collect unique animals and level up.",
  },
];

export const HowItWorks = () => {
  let flexDirection = "justify-start text-left";

  return (
    <div id="#how-it-works">
      <div className="text-center">
        <p
          className={classNames(
            gradientBg,
            "inline-block text-transparent bg-clip-text text-4xl font-extrabold"
          )}
        >
          How it works
        </p>
      </div>

      <div className="mt-8 md:mt-12 w-full">
        {steps.map(({ description, title }) => {
          flexDirection =
            flexDirection === "justify-start text-left"
              ? "justify-end text-right"
              : "justify-start text-left";

          return (
            <div
              key={title}
              className={classNames(flexDirection, "mt-12 flex items-center")}
            >
              <div className="w-7/12">
                <p className="mt-2 text-3xl font-extrabold text-slate-700">
                  {title}
                </p>
                <p>{description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
