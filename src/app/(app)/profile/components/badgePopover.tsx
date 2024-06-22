import { BadgeWithUnlockedAt } from "@/app/api/interfaces/user";
import { Popover } from "../../ui";

export const BadgePopover = ({
  badge,
  isPopoverVisible,
}: {
  badge: BadgeWithUnlockedAt;
  isPopoverVisible: boolean;
}) => {
  const { description, reward, rewardType, title, unlockedAt } = badge;

  return (
    <div>
      {isPopoverVisible && (
        <Popover isPopoverVisible={isPopoverVisible}>
          <div className="text-left">
            <p className="text-lg font-medium capitalize">{title}</p>
            <p className="mt-2 text-xs capitalize">{description}</p>
            <p className="mt-4 text-sm">
              {`Got ${reward} ${rewardType.toUpperCase()} on ${unlockedAt.slice(
                0,
                10
              )}`}
            </p>
          </div>
        </Popover>
      )}
    </div>
  );
};
