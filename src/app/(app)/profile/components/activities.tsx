import { PiUserCheck, PiIdentificationBadge, PiArrowUpRight} from "react-icons/pi";

import { classNames } from "@/utils";

const activities = [
  {
    id: "1",
    type: 'accountCreated',
    content: 'Created',
    target: 'account',
    datetime: '2020-09-20',
    icon: PiUserCheck,
  },
  {
    id: "2",
    type: 'levelUp',
    content: 'Level up to',
    target: 'level 2',
    datetime: '2020-09-22',
    icon: PiArrowUpRight,
  },
  {
    id: "3",
    type: 'levelUp',
    content: 'Level up to',
    target: 'level 3',
    datetime: '2020-09-28',
    icon: PiArrowUpRight,
  },
  {
    id: "4",
    type: 'badgeClaimed',
    content: 'Claimed badge',
    target: 'Feature Pro',
    datetime: '2020-09-30',
    icon: PiIdentificationBadge,
  },
  {
    id: "5",
    type: 'levelUp',
    content: 'Level up to',
    target: 'level 4',
    datetime: '2020-10-04',
    icon: PiArrowUpRight,
  },
  {
    id: "6",
    type: 'badgeClaimed',
    content: 'Claimed badge',
    target: 'Feature Pro',
    datetime: '2020-09-30',
    icon: PiIdentificationBadge,
  },
]

export const Activities = () => {
  return (
    <div className="bg-slate-100 rounded-lg p-4 lg:p-8 shadow-lg">
      <p className="text-2xl font-medium">Activities</p>

      <div className="mt-8 flow-root h-52 overflow-scroll">
      <ul role="list" className="-mb-8">
        {activities.map((event, eventIdx) => (
          <li key={event.id}>
            <div className="relative pb-8">
              {eventIdx !== activities.length - 1 ? (
                <span className="absolute left-4 top-4 -ml-px h-full w-0.5 bg-slate-300" />
              ) : null}
              <div className="relative flex space-x-3">
                <div>
                  <span
                    className={classNames(
                      event.type === 'accountCreated' ? "bg-slate-400" : "",
                      event.type === 'levelUp' ? "bg-blue-400" : "",
                      event.type === 'badgeClaimed' ? "bg-green-400" : "",
                      'flex h-8 w-8 items-center justify-center rounded-full ring-8 ring-slate-100',
                    )}
                  >
                    <event.icon className="h-5 w-5 text-slate-100" />
                  </span>
                </div>
                <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                  <div>
                    <p className="text-sm text-slate-500">
                      {event.content}{' '}
                      <span className="font-medium text-slate-900">
                        {event.target}
                      </span>
                    </p>
                  </div>
                  <div className="whitespace-nowrap text-right text-sm text-gray-500">
                    <p>{formatDate(event.datetime)}</p>
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
    </div>
  );
};

const formatDate = (date: string) => {
  return new Date(date).toISOString().slice(0, 10)
}