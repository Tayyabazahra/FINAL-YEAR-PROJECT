import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerFormSchema } from "../../../../lib/validations";
import { Button, Input } from "../../../../generalComponents";
import {
  EyeClose,
  EyeOpen,
  GoogleIcon,
  Logo,
} from "../../../../assets/svgAssets";
import ROUTES from "../../../../constants/routes";
import { Link, useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { registerUser, getMe } from "../../../../api/auth";
import { showErrorToast } from "../../../../lib/toastUtils";
import { FormattedMessage } from "react-intl";

export const Register = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(registerFormSchema),
  });

  // Check if user is already authenticated
  const { data: userData, isLoading: isLoadingUser } = useQuery({
    queryKey: ["me"],
    queryFn: getMe,
    retry: false,
    onSuccess: (data) => {
      if (data.status === "success") {
        navigate(ROUTES.HOME, { replace: true });
      }
    },
  });

  // if (!isLoadingUser && userData?.status === "success") {
  //   navigate("/home", { replace: true });
  // }

  const { mutate: registerMutation, isPending } = useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      if (data.status !== "success") {
        showErrorToast(data.message);
        return;
      }

      reset();

      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("isAuthenticated", true);

      navigate(ROUTES.DASHBOARD, { replace: true });
    },
    onError: (error) => {
      console.error("Registration failed:", error);
      showErrorToast(error.message);
    },
  });

  const onSubmit = (data) => {
    registerMutation(data);
  };

  useEffect(() => {
    document.title = "Register | Radyab-e-Zakhm";
  }, []);

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  if (isLoadingUser) {
    return <div>Loading...</div>;
  }

  return (
    <main className="w-full bg-surface min-h-screen flex items-center justify-center py-16 px-4 sm:px-0">
      <div className="px-4 w-full p-12 sm:px-12 bg-neutral-0 dark:bg-neutral-950 dark:border-neutral-800 max-w-[540px]  flex flex-col gap-4 lg:gap-8 border border-neutral-200 rounded-xl md:rounded-[48px] shadow-lg dark:shadow-none">
        {/* <div className="flex justify-center text-primary-text">
          <Logo />
        </div> */}

        <div className="flex flex-col gap-1 items-center text-center">
          <h2 className="text-display-sm font-medium text-primary-text">
            <FormattedMessage id="AUTH.REGISTER.WELCOME" />
          </h2>
          <p className="text-md  text-secondary-text">
            <FormattedMessage id="AUTH.REGISTER.CREATE_ACCOUNT" />
          </p>
        </div>

        <div className="   flex flex-col items-center gap-4 0 text-primary-950">
          {/* <p className="text-preset-4 text-secondary-text">Or Log in with:</p> */}
          <a
            href={`${import.meta.env.VITE_API_URL}/auth/google`}
            className="py-4 px-5 flex items-center bg-primary-50 dark:bg-transparent hover:bg-primary-100 text-primary-950 dark:text-neutral-200 dark:hover:bg-neutral-900 justify-center h-12 rounded-xl border border-primary-300 dark:border-neutral-600 self-stretch"
          >
            <span className="text-primary-text">
              <GoogleIcon />
            </span>
            <span className="px-4 ">
              <FormattedMessage id="AUTH.REGISTER.CONTINUE_WITH_GOOGLE" />
            </span>
          </a>

          <div className="flex items-center w-full gap-2">
            <span className="w-full h-[1px] bg-neutral-200 dark:bg-neutral-800 flex-1 flex-shrink-0"></span>
            <span className="text-secondary-text text-sm">
              <FormattedMessage id="AUTH.REGISTER.OR" />
            </span>
            <span className="w-full h-[1px] bg-neutral-200 dark:bg-neutral-800 flex-1 flex-shrink-0"></span>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
          <Input
            placeholder={"John Doe"}
            label={<FormattedMessage id="AUTH.REGISTER.NAME_LABEL" />}
            registerProps={register("name")}
            error={errors.name?.message}
          />
          <Input
            label={<FormattedMessage id="AUTH.REGISTER.EMAIL_LABEL" />}
            registerProps={register("email")}
            error={errors.email?.message}
          />
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
            label={<FormattedMessage id="AUTH.REGISTER.PASSWORD_LABEL" />}
            type={isPasswordVisible ? "text" : "password"}
            error={errors.password?.message}
            registerProps={register("password")}
            hint={errors.password?.message ? "" : "At least 8 characters"}
          />
          <Button
            type="submit"
            label={<FormattedMessage id="AUTH.REGISTER.REGISTER" />}
            isLoading={isPending}
          />
        </form>

        <div className=" flex flex-col items-center gap-4">
          <p className="text-sm text-secondary-text">
            <FormattedMessage id="AUTH.REGISTER.ALREADY_HAVE_ACCOUNT" />{" "}
            <span className="text-primary-text underline">
              <Link to={ROUTES.LOGIN}>
                <FormattedMessage id="AUTH.REGISTER.LOGIN" />
              </Link>
            </span>
          </p>
        </div>
      </div>
    </main>
  );
};
