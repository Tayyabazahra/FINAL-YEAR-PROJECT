import { FormattedMessage } from "react-intl";
import { LogoLink } from "../../../../../layout/dashboardLayout/components/sidebar/components";

export const Footer = () => {
  return (
    <footer className="w-full py-16 px-4 bg-neutral-950 dark:bg-neutral-700 text-white rounded-t-3xl">
      <div>
        <div className="flex items-center justify-between gap-4 max-w-[1110px] mx-auto">
          <span>
            <LogoLink />
          </span>
          <ul className="flex flex-col gap-2 text-sm sm:flex-row sm:gap-4">
            <a href="#home">
              <li className="cursor-pointer hover:text-primary-text">
                <FormattedMessage id="LANDING.HOME" />
              </li>
            </a>
            <a href="#about">
              <li className="cursor-pointer hover:text-primary-text">
                <FormattedMessage id="LANDING.ABOUT" />
              </li>
            </a>
            <a href="#features">
              <li className="cursor-pointer hover:text-primary-text">
                <FormattedMessage id="LANDING.FEATURES" />
              </li>
            </a>
            <a href="#faqs">
              <li className="cursor-pointer hover:text-primary-text">
                <FormattedMessage id="LANDING.FAQS" />
              </li>
            </a>
          </ul>
        </div>
        <div className="text-xs text-center mt-8">
          <FormattedMessage
            id="LANDING.COPYRIGHT"
            values={{ year: new Date().getFullYear() }}
          />
        </div>
      </div>
    </footer>
  );
};
