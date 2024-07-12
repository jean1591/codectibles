import { PiArrowCircleUp, PiShootingStar, PiUserCheck } from "react-icons/pi";

import { ActivityType } from "@/app/api/interfaces/activity";
import { activityTypeMapper } from "../../profile/utils/activityTypeMapper";
import { classNames } from "@/utils";

interface IActivity {
  activityId: string;
  createdAt: string;
  details: string;
  type: ActivityType;
  username: string;
}

const friendsActivity: IActivity[] = [
  {
    username: "arnaudmanaranche",
    type: "levelUp" as ActivityType,
    details: "level 16",
    createdAt: "2024-07-12 08:27:31.915+00",
    activityId: "0a0f778f-91ce-45e9-a8bd-092d7f89d89c",
  },
  {
    username: "arnaudmanaranche",
    type: "levelUp" as ActivityType,
    details: "level 15",
    createdAt: "2024-07-12 06:18:59.448+00",
    activityId: "fa7fa173-493a-40cf-aefc-d368a0c42457",
  },
  {
    username: "guillaumedeslandes",
    type: "levelUp" as ActivityType,
    details: "level 12",
    createdAt: "2024-07-11 08:13:34.423+00",
    activityId: "ea4f336d-deae-4b20-80c2-0ee867666a5c",
  },
  {
    username: "guillaumedeslandes",
    type: "levelUp" as ActivityType,
    details: "level 11",
    createdAt: "2024-07-11 08:13:28.557+00",
    activityId: "2a9af40c-9c20-425e-97f8-71fb5ffad5fb",
  },
  {
    username: "arnaudmanaranche",
    type: "levelUp" as ActivityType,
    details: "level 14",
    createdAt: "2024-07-05 12:13:53.799+00",
    activityId: "32448446-e216-4c30-8d5f-119bbfd85e27",
  },
  {
    username: "arnaudmanaranche",
    type: "badgeClaimed" as ActivityType,
    details: "Refactor Expert",
    createdAt: "2024-07-05 12:13:50.758+00",
    activityId: "cdccce1d-3ea4-4a0e-933c-2e2c8ff76bd8",
  },
  {
    username: "arnaudmanaranche",
    type: "badgeClaimed" as ActivityType,
    details: "Bugfix Specialist",
    createdAt: "2024-07-05 12:12:58.352+00",
    activityId: "a205ea22-bb5b-46d4-aca8-75bc19de26e3",
  },
  {
    username: "arnaudmanaranche",
    type: "levelUp" as ActivityType,
    details: "level 13",
    createdAt: "2024-07-05 12:04:05.061+00",
    activityId: "bd178426-8cd7-4197-8ccf-a09bc1ecaa34",
  },
  {
    username: "arnaudmanaranche",
    type: "badgeClaimed" as ActivityType,
    details: "Chore Master",
    createdAt: "2024-07-05 12:04:03.627+00",
    activityId: "3ef5dfa8-8252-4d09-9a9f-7c6c68e36a1b",
  },
  {
    username: "arnaudmanaranche",
    type: "levelUp" as ActivityType,
    details: "level 12",
    createdAt: "2024-07-04 07:37:56.723+00",
    activityId: "d73130f5-1bce-4806-88b1-3161cac33446",
  },
  {
    username: "arnaudmanaranche",
    type: "levelUp" as ActivityType,
    details: "level 11",
    createdAt: "2024-07-04 05:41:38.169+00",
    activityId: "bb869331-72b5-46fb-a745-5ad9ffe81bae",
  },
  {
    username: "arnaudmanaranche",
    type: "levelUp" as ActivityType,
    details: "level 10",
    createdAt: "2024-07-03 08:43:08.705+00",
    activityId: "6212b41a-970a-4f10-844a-a0502af6cfb1",
  },
  {
    username: "arnaudmanaranche",
    type: "levelUp" as ActivityType,
    details: "level 10",
    createdAt: "2024-07-03 08:42:50.835+00",
    activityId: "285f973f-b4a1-416c-92b7-f2e95962f131",
  },
  {
    username: "arnaudmanaranche",
    type: "badgeClaimed" as ActivityType,
    details: "Feature Creator",
    createdAt: "2024-07-03 08:37:06.038+00",
    activityId: "834b649c-7e3c-464c-934c-6bb1855bec44",
  },
  {
    username: "arnaudmanaranche",
    type: "levelUp" as ActivityType,
    details: "level 9",
    createdAt: "2024-07-03 08:36:13.325+00",
    activityId: "a6e7df2d-9b38-49b4-b75f-d24d174b6578",
  },
  {
    username: "guillaumedeslandes",
    type: "levelUp" as ActivityType,
    details: "level 7",
    createdAt: "2024-07-02 15:32:25.927+00",
    activityId: "1b9ec17a-261d-479c-bb6d-98ad51dd1938",
  },
  {
    username: "guillaumedeslandes",
    type: "levelUp" as ActivityType,
    details: "level 6",
    createdAt: "2024-07-02 15:31:21.786+00",
    activityId: "58bf869b-c29a-4cf6-b148-60708029df54",
  },
  {
    username: "guillaumedeslandes",
    type: "levelUp" as ActivityType,
    details: "level 5",
    createdAt: "2024-07-02 15:31:16.873+00",
    activityId: "885924a9-8057-44d0-a963-8c5e53d8de3f",
  },
  {
    username: "guillaumedeslandes",
    type: "levelUp" as ActivityType,
    details: "level 4",
    createdAt: "2024-07-02 15:31:12.057+00",
    activityId: "177d4579-764e-4f4d-895d-0e88224210cf",
  },
  {
    username: "guillaumedeslandes",
    type: "levelUp" as ActivityType,
    details: "level 3",
    createdAt: "2024-07-02 15:31:06.391+00",
    activityId: "e71031b5-2fa8-4dad-9867-6a9a5f1acdda",
  },
  {
    username: "guillaumedeslandes",
    type: "levelUp" as ActivityType,
    details: "level 2",
    createdAt: "2024-07-02 15:30:13.772+00",
    activityId: "a37a7d25-591f-4d0e-91ef-93d704a85ec5",
  },
  {
    username: "Gilux",
    type: "levelUp" as ActivityType,
    details: "level 7",
    createdAt: "2024-07-02 14:07:35.58+00",
    activityId: "c3e8e586-0828-4ee6-b501-e8636e72f06b",
  },
  {
    username: "Gilux",
    type: "levelUp" as ActivityType,
    details: "level 6",
    createdAt: "2024-07-02 14:07:32.813+00",
    activityId: "fe88f921-ac74-4e6b-b613-79f38044904d",
  },
  {
    username: "Gilux",
    type: "levelUp" as ActivityType,
    details: "level 5",
    createdAt: "2024-07-02 14:07:29.427+00",
    activityId: "58996468-3236-434c-b3eb-39662cfb6a7a",
  },
  {
    username: "Gilux",
    type: "levelUp" as ActivityType,
    details: "level 4",
    createdAt: "2024-07-02 14:07:26.491+00",
    activityId: "5fcf3d4f-603b-4e88-9bab-6a55d2ac4bff",
  },
];

export const FriendsActivity = () => {
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
  activity: IActivity;
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
