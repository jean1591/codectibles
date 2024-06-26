import {
  PiUserCheck,
  PiIdentificationBadge,
  PiArrowUpRight,
} from "react-icons/pi";

import { classNames } from "@/utils";
import { IconType } from "react-icons";

enum ActivityType {
  ACCOUNT_CREATED = "accountCreated,",
  BADGE_CLAIMED = "badgeClaimed,",
  LEVEL_UP = "levelUp",
}

const activities = [
  {
    id: "1",
    type: ActivityType.ACCOUNT_CREATED,
    details: "account",
    createdAt: "2020-09-20",
  },
  {
    id: "2",
    type: ActivityType.LEVEL_UP,
    details: "level 2",
    createdAt: "2020-09-22",
  },
  {
    id: "3",
    type: ActivityType.LEVEL_UP,
    details: "level 3",
    createdAt: "2020-09-28",
  },
  {
    id: "4",
    type: ActivityType.BADGE_CLAIMED,
    details: "Feature Pro",
    createdAt: "2020-09-30",
  },
  {
    id: "5",
    type: ActivityType.LEVEL_UP,
    details: "level 4",
    createdAt: "2020-10-04",
  },
  {
    id: "6",
    type: ActivityType.BADGE_CLAIMED,
    details: "Feature Pro",
    createdAt: "2020-09-30",
  },
];

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
  return (
    <div className="bg-slate-100 rounded-lg p-4 lg:p-8 shadow-lg">
      <p className="text-2xl font-medium">Activities</p>

      <div className="mt-8 flow-root h-52 overflow-scroll">
        <ul role="list" className="-mb-8">
          {activities.map((event, eventIdx) => {
            const activityDetails =
              activityTypeMapper[event.type as ActivityType];
            const Icon = activityDetails.icon;

            return (
              <li key={event.id}>
                <div className="relative pb-8">
                  {eventIdx !== activities.length - 1 ? (
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
                            {event.details}
                          </span>
                        </p>
                      </div>
                      <div className="whitespace-nowrap text-right text-sm text-slate-500">
                        <p>{formatDate(event.createdAt)}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

const formatDate = (date: string) => {
  return new Date(date).toISOString().slice(0, 10);
};
