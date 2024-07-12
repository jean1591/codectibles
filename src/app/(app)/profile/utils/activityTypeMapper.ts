import {
  PiArrowUpRight,
  PiIdentificationBadge,
  PiUserCheck,
} from "react-icons/pi";

import { ActivityType } from "@/app/api/interfaces/activity";
import { IconType } from "react-icons";

export const activityTypeMapper: Record<
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
