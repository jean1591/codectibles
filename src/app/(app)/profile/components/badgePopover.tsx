import { Badge } from "@/app/api/interfaces/profile";
import { Popover } from "../../ui";

export const BadgePopover = ({
  badge,
  isPopoverVisible,
}: {
  badge: Badge;
  isPopoverVisible: boolean;
}) => {
  const { claimedAt, description, reward, rewardType, title } = badge;
  return (
    <div>
      {isPopoverVisible && (
        <Popover isPopoverVisible={isPopoverVisible}>
          <div className="text-left">
            <p className="text-lg font-medium capitalize">{title}</p>
            <p className="mt-2 text-sm capitalize">{description}</p>
            <p className="mt-4 text-sm">
              {`Got ${reward} ${rewardType} on ${claimedAt.toISOString().slice(0, 10)}`}
            </p>
          </div>
        </Popover>
      )}
    </div>
  );
};