import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { changePasswordFormSchema } from "../../../../../lib/validations";
import { useEffect, useState } from "react";
import { PageHeader } from "../../../../../layout/dashboardLayout/components";
import { Links } from "../links";
import { Link } from "react-router-dom";
import ROUTES from "../../../../../constants/routes";
import { EyeClose, EyeOpen, LogoutIcon } from "../../../../../assets/svgAssets";
import { Button, Input } from "../../../../../generalComponents";
import {
  showErrorToast,
  showSuccessToast,
} from "../../../../../lib/toastUtils";
import { useMutation } from "@tanstack/react-query";
import { changePassword } from "../../../../../api/auth";
import { Logout } from "../logout";
import { FormattedMessage } from "react-intl";

export const AccountSettings = () => {
  useEffect(() => {
    document.title = "Account Settings | Radyab-e-Zakhm";
  }, []);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    resolver: zodResolver(changePasswordFormSchema),
  });

  const [isOldPasswordVisible, setIsOldPasswordVisible] = useState(false);
  const [isNewPasswordVisible, setIsNewPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);

  const { mutate: changePasswordMutation, isPending } = useMutation({
    mutationFn: changePassword,
    onSuccess: (data) => {
      if (data.status !== "success") {
        showErrorToast(data.message);
        return;
      }

      reset();

      showSuccessToast("Password changed successfully.");
    },
    onError: (error) => {
      console.error("Registration failed:", error);
      showErrorToast(error.message);
    },
  });

  const onSubmit = (data) => {
    console.log(data);
    const formattedBody = {
      password: data.oldPassword,
      newPassword: data.newPassword,
    };
    changePasswordMutation(formattedBody);
  };

  const selectedLanguage = localStorage.getItem("language");
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

        <div className="flex-1 rounded-t-xl ">
          <div className="p-4 md:p-8 max-w-[528px] flex flex-col gap-6">
            <div className="flex flex-col gap-1">
              <h2 className="text-2xl text-primary-text font-semibold">
                <FormattedMessage id="SETTINGS.CHANGE_PASSWORD" />
              </h2>
            </div>

            <form
              className="flex flex-col gap-4"
              onSubmit={handleSubmit(onSubmit)}
            >
              <Input
                postIcon={
                  <span
                    className="text-primary-text"
                    onClick={() => setIsOldPasswordVisible((prev) => !prev)}
                  >
                    {isOldPasswordVisible ? (
                      <EyeOpen width={20} height={20} />
                    ) : (
                      <EyeClose width={20} height={20} />
                    )}
                  </span>
                }
                label={<FormattedMessage id="SETTINGS.OLD_PASSWORD" />}
                type={isOldPasswordVisible ? "text" : "password"}
                error={errors.oldPassword?.message}
                registerProps={register("oldPassword")}
              />

              <Input
                postIcon={
                  <span
                    className="text-primary-text"
                    onClick={() => setIsNewPasswordVisible((prev) => !prev)}
                  >
                    {isNewPasswordVisible ? (
                      <EyeOpen width={20} height={20} />
                    ) : (
                      <EyeClose width={20} height={20} />
                    )}
                  </span>
                }
                label={<FormattedMessage id="SETTINGS.NEW_PASSWORD" />}
                type={isNewPasswordVisible ? "text" : "password"}
                error={errors.newPassword?.message}
                registerProps={register("newPassword")}
                hint={
                  errors.newPassword?.message ? (
                    ""
                  ) : (
                    <FormattedMessage id="SETTINGS.ATLEAST_8_CHARACTERS" />
                  )
                }
              />

              <Input
                postIcon={
                  <span
                    className="text-primary-text"
                    onClick={() => setIsConfirmPasswordVisible((prev) => !prev)}
                  >
                    {isConfirmPasswordVisible ? (
                      <EyeOpen width={20} height={20} />
                    ) : (
                      <EyeClose width={20} height={20} />
                    )}
                  </span>
                }
                label={<FormattedMessage id="SETTINGS.CONFIRM_PASSWORD" />}
                type={isConfirmPasswordVisible ? "text" : "password"}
                error={errors.confirmPassword?.message}
                registerProps={register("confirmPassword")}
              />

              <div className="flex justify-end w-full">
                <Button
                  label={<FormattedMessage id="SETTINGS.SAVE_PASSWORD" />}
                  type="submit"
                  disabled={isPending}
                  isLoading={isPending}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
