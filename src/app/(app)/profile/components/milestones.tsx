import { ProgressBarWithTitle } from "../../ui";


export const Milestones = () => {
  return (
    <div className="bg-slate-200 rounded-lg p-4 lg:p-8 shadow-lg">
      <ProgressBarWithTitle
        title="138 PR merged"
        reward="+ 250 XP"
        lowerBound="100"
        upperBound="200"
        progress={38}
      />
      <div className="mt-8">
        <ProgressBarWithTitle
          title="403 comments made"
          reward="+ 250 XP"
          lowerBound="200"
          upperBound="500"
          progress={66}
        />
      </div>
      <div className="mt-8">
        <ProgressBarWithTitle
          title="245 PR approved"
          reward="+ 250 XP"
          lowerBound="200"
          upperBound="500"
          progress={10}
        />
      </div>
    </div>
  );
};

