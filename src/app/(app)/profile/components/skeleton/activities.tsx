const fakeActivities = [1, 2, 3, 4, 5];

export const Activities = () => {
  return (
    <div className="bg-slate-100 rounded-lg p-4 lg:p-8 shadow-lg">
      <p className="text-2xl font-medium">Activities</p>

      <div className="mt-8 flow-root max-h-52 overflow-scroll">
        <ul role="list" className="-mb-8">
          {fakeActivities.map((activity, activityIdx) => (
            <Activity
              key={activity}
              activityIdx={activityIdx}
              activitiesLength={fakeActivities.length}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

const Activity = ({
  activityIdx,
  activitiesLength,
}: {
  activityIdx: number;
  activitiesLength: number;
}) => {
  return (
    <li>
      <div className="relative pb-8">
        {activityIdx !== activitiesLength - 1 ? (
          <span className="absolute left-4 top-4 -ml-px h-full w-0.5 bg-slate-300" />
        ) : null}
        <div className="relative flex space-x-3">
          <div>
            <span className="bg-slate-300 text-slate-300 flex h-8 w-8 items-center justify-center rounded-full ring-8 ring-slate-100" />
          </div>
          <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
            <p className="bg-slate-300 text-slate-300 text-sm">
              Activity type and details
            </p>
            <p className="bg-slate-300 text-slate-300 whitespace-nowrap text-right text-sm">
            Activity date
            </p>
          </div>
        </div>
      </div>
    </li>
  );
};
