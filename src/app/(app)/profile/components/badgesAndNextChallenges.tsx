import { classNames } from "@/utils";
import { gradientBg } from "../../ui";

const badges = [
  { badge: "🤓", title: "lorem", description: "lorem ipsum lorem ipsum" },
  { badge: "🐙", title: "ipsum", description: "lorem ipsum lorem ipsum" },
  { badge: "👑", title: "lorem", description: "lorem ipsum lorem ipsum" },
  { badge: "🤝", title: "ipsum", description: "lorem ipsum lorem ipsum" },
  { badge: "🤙🏼", title: "lorem", description: "lorem ipsum lorem ipsum" },
  { badge: "🐶", title: "ipsum", description: "lorem ipsum lorem ipsum" },
  { badge: "🚨", title: "lorem", description: "lorem ipsum lorem ipsum" },
  { badge: "💎", title: "lorem", description: "lorem ipsum lorem ipsum" },
];

const nextChallenges = [
  {
    badge: "🐙",
    title: "Code Conqueror",
    description: "Merge the most pull requests within a month",
    price: "+ 500 XP",
  },
  {
    badge: "👑",
    title: "PR Power-Up",
    description: "Approve the most pull requests in a week",
    price: "+ 250 XP",
  },
  {
    badge: "🤝",
    title: "Merge Master",
    description: "Merge at least 20 pull requests in two weeks",
    price: "+ 100 XP",
  },
  {
    badge: "🤓",
    title: "Commit Champion",
    description: "Make the highest number of commits in a month",
    price: "+ 500 XP",
  },
  {
    badge: "🐙",
    title: "Issue Resolver",
    description: "Close the most issues in a week",
    price: "+ 300 XP",
  },
  {
    badge: "🤓",
    title: "Branch Brilliance",
    description: "Create and merge the most branches in a month",
    price: "+ 1000 XP",
  },
];

export const BadgesAndNextChallenges = () => {
  return (
    <div className="bg-slate-400/25 rounded-lg p-4 lg:p-8">
      {/* COMPLETED */}
      <div>
        <p className="text-2xl font-medium">Completed</p>

        <div className="mt-8 grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-4 xl:grid-cols-5 grid-flow-row items-center justify-center gap-4">
          {badges.map(({ badge }) => (
            <div
              key={badge}
              className={classNames(
                gradientBg,
                "flex items-center justify-center h-20 w-20 border-2 border-slate-200 rounded-lg"
              )}
            >
              <p className="text-4xl">{badge}</p>
            </div>
          ))}
        </div>
      </div>

      {/* NEXT CHALLENGES */}
      <div className="mt-12">
        <p className="text-2xl font-medium">Next challenges</p>

        <div className="mt-8">
          {nextChallenges.map(({ description, price, title }) => (
            <div
              key={title}
              className={classNames(gradientBg, "rounded-lg p-[2px] mt-2")}
            >
              <div className="flex items-center justify-between p-4 bg-slate-300 rounded-lg">
                <div>
                  <p className="text-lg font-medium">{title}</p>
                  <p className="text-xs text-slate-600">{description}</p>
                </div>
                <div>
                  <p className="text-lg text-nowrap">{price}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
