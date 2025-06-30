import { FormattedMessage } from "react-intl";
import ROUTES from "../../../../../constants/routes";
import { Button } from "../../../../../generalComponents";
import { LogoLink } from "../../../../../layout/dashboardLayout/components/sidebar/components";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
  const navigate = useNavigate();

  const toggleLanguage = () => {
    const currentLang = localStorage.getItem("language") || "en";
    const newLang = currentLang === "en" ? "ur" : "en";
    localStorage.setItem("language", newLang);
    window.location.reload(); // Reload to apply new language
  };

  return (
    <nav className="flex justify-between items-center p-4 pt-8 max-w-[1110px] mx-auto">
      <div>
        <LogoLink />
      </div>
      <ul className="sm:flex items-center gap-4 text-md font-medium text-secondary-text hidden ">
        <a href="#home">
          <li className="cursor-pointer hover:text-primary-text">
            <FormattedMessage id="LANDING.HOME" />
          </li>
        </a>
        <a href="#about">
          <li
            className="cursor-pointer hover:text-primary-text"
            onClick={() => navigate("#about")}
          >
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

      <div className="flex items-center gap-4">
        <button
          onClick={toggleLanguage}
          className="px-3 py-1 rounded border border-primary-text text-primary-text hover:bg-neutral-200 dark:hover:bg-neutral-800 hover:text-white transition-colors"
        >
          {localStorage.getItem("language") === "en" ? "اردو" : "English"}
        </button>
        <Button
          label={<FormattedMessage id="LANDING.START_DETECTING" />}
          onClick={() => navigate(ROUTES.LOGIN)}
        />
      </div>
    </nav>
  );
};
