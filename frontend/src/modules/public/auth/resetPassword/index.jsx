import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { resetPasswordFormSchema } from "../../../../lib/validations";
import { Button, Input } from "../../../../generalComponents";
import { EyeClose, EyeOpen, Logo } from "../../../../assets/svgAssets";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { resetPassword } from "../../../../api/auth";
import { showErrorToast, showSuccessToast } from "../../../../lib/toastUtils";
import ROUTES from "../../../../constants/routes";
import { FormattedMessage } from "react-intl";

export const ResetPassword = () => {
  const navigate = useNavigate();
  const { token } = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      password: "",
      passwordConfirmation: "",
    },
    resolver: zodResolver(resetPasswordFormSchema),
  });

  const { mutate: resetPasswordMutation, isPending } = useMutation({
    mutationFn: resetPassword,
    onSuccess: (data) => {
      if (data.status !== "success") {
        showErrorToast(data.message);
        return;
      }

      reset();

      showSuccessToast("Registered successfully. Redirecting...");

      navigate(ROUTES.DASHBOARD, { replace: true });
    },
    onError: (error) => {
      console.error("Registration failed:", error);
      showErrorToast(error.message);
    },
  });

  const onSubmit = (data) => {
    const formattedBody = {
      token,
      password: data.password,
    };

    resetPasswordMutation(formattedBody);
  };

  useEffect(() => {
    document.title = "Reset Password | Radyab-e-Zakhm";
  }, []);

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isPasswordConfirmationVisible, setIsPasswordConfirmationVisible] =
    useState(false);
  return (
    <main className="w-full bg-surface min-h-screen flex items-center justify-center py-16 px-4 sm:px-0">
      <div className="px-4 w-full p-12 sm:px-12 bg-neutral-0 dark:bg-neutral-950 dark:border-neutral-800 max-w-[540px]  flex flex-col gap-4 lg:gap-8 border border-neutral-200 rounded-xl md:rounded-[48px] shadow-lg dark:shadow-none">
        <div className="flex flex-col gap-1 items-center text-center">
          <h2 className="text-display-sm font-medium  text-primary-text">
            <FormattedMessage id="AUTH.RESET_PASSWORD.TITLE" />
          </h2>
          <p className="text-md  text-secondary-text">
            <FormattedMessage id="AUTH.RESET_PASSWORD.DESCRIPTION" />
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
          <Input
            postIcon={
              <span
                className="text-primary-text"
                onClick={() => setIsPasswordVisible((prev) => !prev)}
              >
                {isPasswordVisible ? (
                  <EyeOpen width={20} height={20} />
                ) : (
                  <EyeClose width={20} height={20} />
                )}
              </span>
            }
            label={
              <FormattedMessage id="AUTH.RESET_PASSWORD.NEW_PASSWORD_LABEL" />
            }
            type={isPasswordVisible ? "text" : "password"}
            error={errors.password?.message}
            registerProps={register("password")}
            hint={
              errors.password?.message ? (
                ""
              ) : (
                <FormattedMessage id="AUTH.RESET_PASSWORD.NEW_PASSWORD_HINT" />
              )
            }
          />

          <Input
            postIcon={
              <span
                className="text-primary-text"
                onClick={() =>
                  setIsPasswordConfirmationVisible((prev) => !prev)
                }
              >
                {isPasswordVisible ? (
                  <EyeOpen width={20} height={20} />
                ) : (
                  <EyeClose width={20} height={20} />
                )}
              </span>
            }
            label={
              <FormattedMessage id="AUTH.RESET_PASSWORD.CONFIRM_NEW_PASSWORD_LABEL" />
            }
            type={isPasswordConfirmationVisible ? "text" : "password"}
            error={errors.passwordConfirmation?.message}
            registerProps={register("passwordConfirmation")}
          />
          <Button
            type="submit"
            label={<FormattedMessage id="AUTH.RESET_PASSWORD.RESET_PASSWORD" />}
            isLoading={isPending}
          />
        </form>
      </div>
    </main>
  );
};
