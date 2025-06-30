import { NavLink } from "react-router-dom";
import {
  ChevronRight,
  LockIcon,
  ProfileIcon,
  SunIcon,
  TranslationIcon,
} from "../../../../../assets/svgAssets";
import ROUTES from "../../../../../constants/routes";
import { FormattedMessage } from "react-intl";

const LINKS = [
  {
    id: 0,
    name: <FormattedMessage id="SETTINGS.COLOR_THEME" />,
    icon: <SunIcon />,
    route: ROUTES.THEME_SETTINGS,
  },

  {
    id: 2,
    name: <FormattedMessage id="SETTINGS.CHANGE_PASSWORD" />,
    icon: <LockIcon />,
    route: ROUTES.ACCOUNT_SETTINGS,
  },
  {
    id: 3,
    name: <FormattedMessage id="SETTINGS.PROFILE" />,
    icon: <ProfileIcon />,
    route: ROUTES.PROFILE_SETTINGS,
  },
  {
    id: 4,
    name: <FormattedMessage id="SETTINGS.LANGUAGE" />,
    icon: <TranslationIcon />,
    route: ROUTES.LANGUAGE_SETTINGS,
  },
];

const selectedLanguage = localStorage.getItem("language");

export const Links = () => {
  return (
    <div className="flex flex-col pb-2 border-b border-neutral-200 dark:border-neutral-800">
      {LINKS.map((link) => (
        <NavLink
          key={link.id}
          to={link.route}
          className={({ isActive }) =>
            `flex items-center justify-between gap-2 py-2.5 px-3 text-sm text-secondary-text rounded-lg ${
              isActive ? "bg-surface " : ""
            }`
          }
        >
          {({ isActive }) => (
            <>
              <div className="flex items-center gap-2">
                <span
                  className={isActive ? "text-green-500" : "text-primary-text"}
                >
                  {link.icon}
                </span>
                <span>{link.name}</span>
              </div>
              {isActive && (
                <span
                  className={`text-primary-text ${
                    selectedLanguage === "ur" ? "rotate-180" : ""
                  }`}
                >
                  <ChevronRight />
                </span>
              )}
            </>
          )}
        </NavLink>
      ))}
    </div>
  );
};
