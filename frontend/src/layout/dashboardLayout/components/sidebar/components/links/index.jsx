import { NavLink } from "react-router-dom";
import ROUTES from "../../../../../../constants/routes";
import {
  ChevronRight,
  ClockIcon,
  HomeIcon,
  PersonsIcon,
  SearchIcon,
} from "../../../../../../assets/svgAssets";
import { motion, AnimatePresence } from "framer-motion";
import { FormattedMessage } from "react-intl";

const LINKS = [
  {
    id: 0,
    name: <FormattedMessage id="DASHBOARD.HOME" />,
    icon: <HomeIcon />,
    route: ROUTES.HOME,
  },
  {
    id: 1,
    name: <FormattedMessage id="DASHBOARD.DETECT" />,
    icon: <SearchIcon />,
    route: ROUTES.DETECT,
  },
  {
    id: 2,
    name: <FormattedMessage id="DASHBOARD.HISTORY" />,
    icon: <ClockIcon />,
    route: ROUTES.HISTORY,
  },
  {
    id: 3,
    name: <FormattedMessage id="DASHBOARD.DOCTORS" />,
    icon: <PersonsIcon />,
    route: ROUTES.DOCTORS,
  },
];

export const Links = ({ isExpanded = true }) => {
  const selectedLanguage = localStorage.getItem("language");
  return (
    <div className="flex flex-col pb-2 gap-2">
      {LINKS.map((link) => (
        <NavLink
          key={link.id}
          to={link.route}
          className={({ isActive }) =>
            `flex items-center justify-between gap-2 py-2.5 px-3 text-preset-4 text-secondary-text rounded-lg ${
              isActive ? "bg-primary-50 dark:bg-surface " : ""
            }`
          }
        >
          {({ isActive }) => (
            <>
              <div className="flex items-center gap-2">
                <span
                  className={
                    isActive ? "text-primary-500" : "text-primary-text"
                  }
                >
                  {link.icon}
                </span>
                <AnimatePresence mode="wait">
                  {isExpanded && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.15 }}
                    >
                      {link.name}
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
              <AnimatePresence mode="wait">
                {isActive && isExpanded && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                    className={`text-primary-text ${
                      selectedLanguage === "ur" ? "rotate-180" : ""
                    }`}
                  >
                    <ChevronRight />
                  </motion.span>
                )}
              </AnimatePresence>
            </>
          )}
        </NavLink>
      ))}
    </div>
  );
};
