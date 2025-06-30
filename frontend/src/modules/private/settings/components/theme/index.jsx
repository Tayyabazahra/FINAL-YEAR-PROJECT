import { useEffect, useState } from "react";
import { LogoutIcon, MoonIcon, SunIcon } from "../../../../../assets/svgAssets";
import { PageHeader } from "../../../../../layout/dashboardLayout/components";
import { Links } from "../links";
import { Link } from "react-router-dom";
import ROUTES from "../../../../../constants/routes";
import { Button, Option } from "../../../../../generalComponents";
import { Logout } from "../logout";
import { FormattedMessage } from "react-intl";

const themeOptions = [
  {
    id: 0,
    title: <FormattedMessage id="SETTINGS.COLOR_THEME_LIGHT" />,
    subtitle: <FormattedMessage id="SETTINGS.COLOR_THEME_LIGHT_DESCRIPTION" />,
    icon: <SunIcon />,
    value: "light",
  },
  {
    id: 1,
    title: <FormattedMessage id="SETTINGS.COLOR_THEME_DARK" />,
    subtitle: <FormattedMessage id="SETTINGS.COLOR_THEME_DARK_DESCRIPTION" />,
    icon: <MoonIcon />,
    value: "dark",
  },
];

export const ThemeSettings = () => {
  const [selectedOption, setSelectedOption] = useState(
    localStorage.getItem("theme") || "light"
  );

  useEffect(() => {
    document.title = "Theme Settings | Radyab-e-Zakhm";
  }, []);

  const handleThemeChange = () => {
    localStorage.setItem("theme", selectedOption);

    // Add or remove the 'dark' class from the body element
    if (selectedOption === "dark") {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  };

  const selectedLanguage = localStorage.getItem("language");

  return (
    <div className="w-full flex-1 max-h-dvh h-full bg-surface-2">
      <PageHeader title="Settings" />

      <div
        className={`lg:flex-row p-6 flex gap-6 flex-col flex-1 bg-neutral-50/75  dark:bg-neutral-900 ${
          selectedLanguage === "ur" ? "rounded-tr-[40px]" : "rounded-tl-[40px]"
        } h-[calc(100vh-81px-80px)] lg:h-[calc(100vh-81px)] overflow-y-auto`}
      >
        <div
          className={` pl-8 py-5 pr-4 hidden border-neutral-200 dark:border-neutral-800 lg:flex flex-col gap-2 w-[260px] h-full ${
            selectedLanguage === "ur" ? "border-l" : "border-r"
          }`}
        >
          <Links />
          <Logout />
        </div>

        <div className="flex-1 ">
          <div className="p-4 md:p-8 max-w-[528px] flex flex-col gap-6">
            <div className="flex flex-col gap-1">
              <h2 className="text-xl text-primary-text font-semibold">
                <FormattedMessage id="SETTINGS.COLOR_THEME" />
              </h2>
              <p className="text-sm text-secondary-text">
                <FormattedMessage id="SETTINGS.COLOR_THEME_DESCRIPTION" />
              </p>
            </div>

            <div className="flex flex-col gap-4">
              {themeOptions.map((option) => (
                <Option
                  key={option.id}
                  title={option.title}
                  subtitle={option.subtitle}
                  icon={option.icon}
                  selected={selectedOption === option.value}
                  setSelected={() => setSelectedOption(option.value)}
                  value={option.value}
                />
              ))}
            </div>

            <div className="flex justify-end w-full">
              <Button
                label={<FormattedMessage id="SETTINGS.APPLY_CHANGES" />}
                onClick={handleThemeChange}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
