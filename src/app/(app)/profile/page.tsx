import { classNames } from "@/utils";

const gradientBg = "bg-gradient-to-r from-violet-500 to-indigo-300";

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

export default async function Profile() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <LevelAndXp />
      <BadgesAndNextChallenges />
    </div>
  );
}

const LevelAndXp = () => {
  return (
    <div className="bg-slate-400/25 rounded-lg p-4 md:p-8">
      <div className="flex items-center justify-between">
        <p className="text-2xl font-medium text-left">Level 76</p>
        <p className="text-xl text-right">3653 XP</p>
      </div>

      <div className="mt-8">
        <div className="overflow-hidden rounded-full bg-slate-200">
          <div
            className={classNames(gradientBg, "h-2 rounded-full")}
            style={{ width: "37.5%" }}
          />
        </div>
        <div className="mt-4 grid-cols-2 text-base font-medium grid">
          <div className="text-left">3500 XP</div>
          <div className="text-right">5000 XP</div>
        </div>
      </div>
    </div>
  );
};

const BadgesAndNextChallenges = () => {
  return (
    <div className="bg-slate-400/25 rounded-lg p-4 md:p-8">
      {/* COMPLETED */}
      <div>
        <p className="text-2xl font-medium">Completed</p>

        <div className="mt-8 grid grid-cols-4 md:grid-cols-5 grid-flow-row items-center justify-center gap-4">
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
