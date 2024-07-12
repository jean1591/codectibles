import { setActivities, setUser } from "@/app/lib/store/features/user/slice";
import { useDispatch, useSelector } from "react-redux";

import { Activities as ActivitiesSkeleton } from "./skeleton/activities";
import { RootState } from "@/app/lib/store/store";
import { Activity as TypeActivity } from "@/app/api/interfaces/activity";
import { User } from "@/app/api/interfaces/user";
import { activityTypeMapper } from "../utils/activityTypeMapper";
import { classNames } from "@/utils";
import { useEffect } from "react";

export const Activities = () => {
  const dispatch = useDispatch();
  const { activities } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    (async function getActivities() {
      const userResponse = await fetch("/api/users");
      const user = (await userResponse.json()) as User;

      dispatch(setUser(user));

      const activitiesResponse = await fetch(
        `/api/users/${user.id}/activities`
      );
      const activities = (await activitiesResponse.json()) as TypeActivity[];

      dispatch(setActivities(activities));
    })();
  }, []);

  if (!activities) {
    return <ActivitiesSkeleton />;
  }

  return (
    <div className="bg-white rounded-lg p-4 lg:p-8 shadow-lg">
      <p className="text-2xl font-medium">Activities</p>

      <div className="mt-8 flow-root max-h-96 overflow-scroll">
        <ul role="list" className="-mb-8">
          {activities.map((activity, activityIdx) => (
            <Activity
              key={activity.id}
              activity={activity}
              activityIdx={activityIdx}
              activitiesLength={activities.length}
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
  activity: TypeActivity;
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
        <div className="relative flex space-x-3">
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
          <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
            <div>
              <p className="text-sm text-slate-500">
                {activityDetails.content}{" "}
                <span className="font-medium text-slate-900">
                  {activity.details}
                </span>
              </p>
            </div>
            <div className="whitespace-nowrap text-right text-sm text-slate-500">
              <p>{activity.createdAt}</p>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};
