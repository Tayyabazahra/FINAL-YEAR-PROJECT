import { NavLink } from "react-router-dom";
import {
  ClockIcon,
  HomeIcon,
  PersonsIcon,
  SearchIcon,
  SettingsIcon,
} from "../../../../assets/svgAssets";
import ROUTES from "../../../../constants/routes";

const tabs = [
  {
    id: 0,
    name: "Home",
    icon: <HomeIcon />,
    route: ROUTES.HOME,
    isLast: false,
  },
  {
    id: 1,
    name: "Detect",
    icon: <SearchIcon />,
    route: ROUTES.DETECT,
    isLast: false,
  },
  {
    id: 2,
    name: "History",
    icon: <ClockIcon />,
    route: ROUTES.HISTORY,
    isLast: false,
  },
  {
    id: 3,
    name: "Doctors",
    icon: <PersonsIcon />,
    route: ROUTES.DOCTORS,
    isLast: false,
  },
  {
    id: 4,
    name: "Settings",
    icon: <SettingsIcon />,
    route: ROUTES.SETTINGS,
    isLast: true,
  },
];

export const Tabs = () => {
  return (
    <div className="flex py-3 px-4   md:px-8 bg-surface-2 border-t h-[47px] sm:h-[75px] border-neutral-200 dark:border-neutral-800 items-center gap-4 justify-between">
      {tabs.map((tab) => (
        <>
          <NavLink
            to={tab.route}
            key={tab.id}
            className={({ isActive }) =>
              `${
                isActive
                  ? "text-green-500 bg-blue-50 dark:bg-neutral-700"
                  : "text-secondary-text"
              } w-full flex items-center justif-center gap-1 py-1 flex-col rounded-sm`
            }
          >
            <span>{tab.icon}</span>
            <p className="text-preset-5 hidden sm:block">{tab.name}</p>
          </NavLink>
          {!tab.isLast && (
            <div className="h-10 hidden sm:block w-[1px] bg-neutral-200 dark:bg-neutral-800"></div>
          )}
        </>
      ))}
    </div>
  );
};
