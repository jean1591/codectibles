import { FriendActivity } from "@/app/api/interfaces/social";
import { FriendsActivity as FriendsActivitySkeleton } from "./skeleton/activities";
import { RootState } from "@/app/lib/store/store";
import { activityTypeMapper } from "../../profile/utils/activityTypeMapper";
import { classNames } from "@/utils";
import { useSelector } from "react-redux";

export const FriendsActivity = () => {
  const { friendsActivity } = useSelector((state: RootState) => state.social);

  if (!friendsActivity) {
    return <FriendsActivitySkeleton />;
  }
  return (
    <div className="bg-white rounded-lg p-4 lg:p-8 shadow-lg">
      <p className="text-2xl font-medium">Friends activity</p>

      <div className="mt-8 flow-root max-h-96 overflow-scroll">
        <ul role="list" className="-mb-8">
          {friendsActivity.map((activity, activityIdx) => (
            <Activity
              key={activity.activityId}
              activity={activity}
              activityIdx={activityIdx}
              activitiesLength={friendsActivity.length}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

const Activity = ({
  activity,
  activityIdx,
  activitiesLength,
}: {
  activity: FriendActivity;
  activityIdx: number;
  activitiesLength: number;
}) => {
  const activityDetails = activityTypeMapper[activity.type];
  const Icon = activityDetails.icon;

  return (
    <li>
      <div className="relative pb-8">
        {activityIdx !== activitiesLength - 1 ? (
          <span className="absolute left-4 top-4 -ml-px h-full w-0.5 bg-slate-300" />
        ) : null}
        <div className="relative flex items-center space-x-3">
          <div>
            <span
              className={classNames(
                activityDetails.bgColor,
                "flex h-8 w-8 items-center justify-center rounded-full ring-8 ring-white"
              )}
            >
              <Icon className="h-5 w-5 text-white" />
            </span>
          </div>
          <div className="flex min-w-0 flex-1 justify-between space-x-4">
            <div>
              <p className="font-medium">{activity.username}</p>
              <p className="text-sm text-slate-500">
                {activityDetails.content}{" "}
                <span className="font-medium text-slate-900">
                  {activity.details}
                </span>
              </p>
            </div>
            <div className="whitespace-nowrap text-right text-sm text-slate-500">
              <p>{activity.createdAt.slice(0, 10)}</p>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};
