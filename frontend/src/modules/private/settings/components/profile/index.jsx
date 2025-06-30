import { useEffect, useState } from "react";
import { PageHeader } from "../../../../../layout/dashboardLayout/components";
import { Links } from "../links";

import { Logout } from "../logout";
import { FormattedMessage } from "react-intl";

import Profile from "../../../../../assets/profile.png";
import { Button } from "../../../../../generalComponents";
import { DeleteAccountModal } from "../../../../../modals";
import { getMe } from "../../../../../api/auth";
import { useQuery } from "@tanstack/react-query";

// Avatar component for showing initials
const Avatar = ({ name, size = "md" }) => {
  const getInitials = (name) => {
    if (!name) return "?";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const sizeClasses = {
    sm: "size-16",
    md: "size-16 md:w-24 md:h-24",
    lg: "size-24 md:w-32 md:h-32",
  };

  return (
    <div
      className={`${sizeClasses[size]} rounded-full bg-pink-500 flex items-center justify-center text-white font-semibold text-xl`}
    >
      {getInitials(name)}
    </div>
  );
};

export const ProfileSettings = () => {
  useEffect(() => {
    document.title = "Profile Settings | Radyab-e-Zakhm";
  }, []);

  const [showDeleteAccountModal, setShowDeleteAccountModal] = useState(false);

  const selectedLanguage = localStorage.getItem("language");

  const { data, isLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: getMe,
  });

  const user = data?.user;

  return (
    <div className="w-full flex-1 max-h-dvh h-full bg-surface-2 ">
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

        <div className="flex-1 rounded-t-xl flex flex-col w-full">
          {/* Heading  */}
          <div className="p-4 md:p-8 max-w-[528px]  flex flex-col gap-6">
            <div className="flex flex-col gap-1">
              <h2 className="text-2xl text-primary-text font-semibold">
                <FormattedMessage id="SETTINGS.PROFILE_DETAILS" />
              </h2>
            </div>
          </div>

          {isLoading ? (
            <p> Loading...</p>
          ) : (
            <div className="flex items-center gap-4 w-full">
              {user?.imgUrl ? (
                <img
                  src={user.imgUrl}
                  alt={user?.name || "Profile"}
                  className="size-16 md:w-24 md:h-24 rounded-full object-cover"
                />
              ) : (
                <Avatar name={user?.name} />
              )}
              <div className="flex flex-col">
                <h3 className="text-2xl font-semibold text-primary-text">
                  {user?.name}
                </h3>
                <p className="text-sm text-secondary-text">{user?.email}</p>
              </div>
            </div>
          )}

          <div className="w-full max-w-md h-[1px] bg-neutral-200 dark:bg-neutral-800 my-4 lg:my-8"></div>

          <div>
            <h3 className="text-2xl text-primary-text font-medium">
              <FormattedMessage id="SETTINGS.DELETE_ACCOUNT" />
            </h3>
            <p className="text-md text-secondary-text mt-2">
              <FormattedMessage id="SETTINGS.DELETE_ACCOUNT_DESCRIPTION" />
            </p>
            <Button
              label={<FormattedMessage id="SETTINGS.DELETE_ACCOUNT_BUTTON" />}
              variant="destructive"
              className="mt-4"
              onClick={() => setShowDeleteAccountModal(true)}
            />
          </div>
        </div>
      </div>

      {showDeleteAccountModal && (
        <DeleteAccountModal
          showModal={showDeleteAccountModal}
          setShowModal={setShowDeleteAccountModal}
        />
      )}
    </div>
  );
};
