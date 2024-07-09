import { Popover } from "../../ui";
import { UserBadge } from "@/app/api/interfaces/badge";

export const BadgePopover = ({
  badge,
  isPopoverVisible,
}: {
  badge: UserBadge;
  isPopoverVisible: boolean;
}) => {
  const { description, reward, title, unlockedAt } = badge;

  return (
    <div>
      {isPopoverVisible && (
        <Popover isPopoverVisible={isPopoverVisible}>
          <div className="text-left">
            <p className="text-lg font-medium capitalize">{title}</p>
            <p className="mt-2 text-xs capitalize">{description}</p>
            <p className="mt-4 text-sm">
              {`Got ${reward} XP on ${unlockedAt?.slice(0, 10)}`}
            </p>
          </div>
        </Popover>
      )}
    </div>
  );
};
