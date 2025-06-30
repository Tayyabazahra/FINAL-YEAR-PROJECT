import { Link } from "react-router-dom";
import { SettingsIcon } from "../../../../assets/svgAssets";
import ROUTES from "../../../../constants/routes";
import { LogoLink } from "../sidebar/components";
import { Button } from "../../../../generalComponents";
import { UlcerDetectModal } from "../../../../modals/ulcerDetectModal";
import { useState } from "react";
import { Profile } from "../profile";
import { FormattedMessage } from "react-intl";
export const PageHeader = ({ title, isLargeHidden = false }) => {
  const [isUlcerModalOpen, setIsUlcerModalOpen] = useState(false);
  return (
    <div className="bg-neutral-100 dark:bg-neutral-800">
      {/* Small Screens top banner  */}
      <div className="lg:hidden py-3 px-4 h-14 md:py-4 md:px-8 md:h-[74px] dark:bg-neutral-800 text-primary-text bg-neutral-100 flex items-center">
        <div className="flex items-center gap-4 justify-between flex-1">
          <LogoLink />

          <div className="flex items-center gap-4">
            <Button
              label={<FormattedMessage id="DASHBOARD.DETECT" />}
              className="text-xs"
              onClick={() => setIsUlcerModalOpen(true)}
            />
            <div className="w-[1px] h-10 flex-1 bg-neutral-200 dark:bg-neutral-800"></div>
            <Profile />
          </div>
        </div>
      </div>
      <div className="flex rounded-t-2xl lg:rounded-none bg-surface-2 items-center justify-between lg:h-[81px]  p-4 pb-0 lg:py-8 lg:px-8  pt-0">
        <h1
          className={`text-2xl font-bold text-primary-text dark:text-white ${
            isLargeHidden && "hidden lg:block"
          }`}
        >
          {title}
        </h1>

        <div className=" items-center gap-4 hidden lg:flex">
          <div className="flex items-center gap-4 ">
            <Button
              label={<FormattedMessage id="BUTTON.DETECT_ULCER" />}
              className="text-xs"
              onClick={() => setIsUlcerModalOpen(true)}
            />

            <div className="w-[1px] h-10 flex-1 bg-neutral-200 dark:bg-neutral-800"></div>
            <Profile />
            <div className="w-[1px] h-10 flex-1 bg-neutral-200 dark:bg-neutral-800"></div>

            <Link
              to={ROUTES.THEME_SETTINGS}
              className="text-primary-text size-[42px] rounded-md hover:bg-neutral-200 dark:hover:bg-neutral-800 flex items-center justify-center "
            >
              <SettingsIcon />
            </Link>
          </div>
        </div>
      </div>

      {isUlcerModalOpen && (
        <UlcerDetectModal
          showModal={isUlcerModalOpen}
          setShowModal={setIsUlcerModalOpen}
        />
      )}
    </div>
  );
};
