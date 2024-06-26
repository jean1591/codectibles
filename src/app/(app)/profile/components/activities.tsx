import {
  PiUserCheck,
  PiIdentificationBadge,
  PiArrowUpRight,
} from "react-icons/pi";

import { classNames } from "@/utils";
import { IconType } from "react-icons";
import {
  Activity as TypeActivity,
  ActivityType,
} from "@/app/api/interfaces/activity";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setActivities } from "@/app/lib/store/features/user/slice";
import { RootState } from "@/app/lib/store/store";

const activityTypeMapper: Record<
  ActivityType,
  { bgColor: string; content: string; icon: IconType }
> = {
  [ActivityType.ACCOUNT_CREATED]: {
    bgColor: "bg-gradient-to-tr from-slate-500 to-slate-200",
    content: "Created",
    icon: PiUserCheck,
  },
  [ActivityType.BADGE_CLAIMED]: {
    bgColor: "bg-gradient-to-tr from-green-500 to-green-200",
    content: "Claimed badge",
    icon: PiIdentificationBadge,
  },
  [ActivityType.LEVEL_UP]: {
    bgColor: "bg-gradient-to-tr from-blue-500 to-blue-200",
    content: "Level up to",
    icon: PiArrowUpRight,
  },
};

export const Activities = () => {
  const dispatch = useDispatch();
  const { activities } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    (async function getActivities() {
      const activitiesResponse = await fetch("/api/activity");
      const activities = (await activitiesResponse.json()) as TypeActivity[];

      dispatch(setActivities(activities));
    })();
  }, []);

  // TODO: create skeleton
  if (!activities) {
    return <></>;
  }

  return (
    <div className="bg-slate-100 rounded-lg p-4 lg:p-8 shadow-lg">
      <p className="text-2xl font-medium">Activities</p>

      <div className="mt-8 flow-root max-h-52 overflow-scroll">
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
                "flex h-8 w-8 items-center justify-center rounded-full ring-8 ring-slate-100"
              )}
            >
              <Icon className="h-5 w-5 text-slate-100" />
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
