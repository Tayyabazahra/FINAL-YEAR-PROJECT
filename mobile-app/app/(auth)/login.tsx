import {
  ActivityIndicator,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useForm } from "react-hook-form";
import CustomInput from "@/components/CustomInput";
import { icons } from "@/constants/icons";
import { useState } from "react";
import { Link, router } from "expo-router";
import { useMutation } from "@tanstack/react-query";
import { login } from "@/api/auth";
import Toast from "react-native-toast-message";
import * as SecureStore from "expo-secure-store";
import { FormattedMessage, useIntl } from "react-intl";

const Login = () => {
  const intl = useIntl();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [passwordShown, setPasswordShown] = useState(false);

  const { mutate: loginUser, isPending } = useMutation({
    mutationFn: login,
    onSuccess: async (res) => {
      console.log("res", res);
      await SecureStore.setItemAsync("userToken", res?.data?.token);
      await SecureStore.setItemAsync("user", JSON.stringify(res?.data?.user));
      router.push("/(tabs)");
    },
    onError: (err) => {
      console.log("err", err);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: err?.response?.data?.message || "An error occured",
      });
    },
  });

  const onSubmit = (data: any) => {
    loginUser(data);
  };

  return (
    <View className=" px-5 pt-6 w-full min-h-screen bg-neutral-50 dark:bg-neutral-950 ">
      <View>
        <View className="mt-12 mb-8">
          <Text className="text-display-sm font-jakarta-bold text-text-primary dark:text-base-white">
            <FormattedMessage id="LOGIN" defaultMessage="Login" />
          </Text>
        </View>

        <View className="gap-4">
          <CustomInput
            control={control}
            name="email"
            rules={{ required: "Email is required" }}
            label={intl.formatMessage({
              id: "EMAIL_ADDRESS",
              defaultMessage: "Email Address",
            })}
            placeholder={intl.formatMessage({
              id: "ENTER_YOUR_EMAIL",
              defaultMessage: "Enter your email",
            })}
          />

          <CustomInput
            control={control}
            name="password"
            rules={{ required: "Password is required" }}
            label={intl.formatMessage({
              id: "PASSWORD",
              defaultMessage: "Password",
            })}
            placeholder={intl.formatMessage({
              id: "ENTER_YOUR_PASSWORD",
              defaultMessage: "Enter your password",
            })}
            secureTextEntry={!passwordShown}
            hasPostIcon
            postIcon={
              <TouchableOpacity
                onPress={() => setPasswordShown((prev) => !prev)}
              >
                <Image
                  source={passwordShown ? icons.eyeClose : icons.eyeOpen}
                  className="size-8"
                  resizeMode="contain"
                  tintColor={"#84cc16"}
                />
              </TouchableOpacity>
            }
          />
        </View>

        <TouchableOpacity onPress={handleSubmit(onSubmit)}>
          <View className="items-center justify-center flex-row mt-8">
            {isPending ? (
              <ActivityIndicator color="#84cc16" />
            ) : (
              <Text className="text-neutral-50 py-3 px-4 bg-btn-primary-bg  dark:bg-neutral-50 dark:text-neutral-950 font-jost-bold text-lg min-h-12 rounded-[24px] flex-1 text-center">
                <FormattedMessage id="LOGIN" defaultMessage="Login" />
              </Text>
            )}
          </View>
        </TouchableOpacity>
      </View>

      <View className="flex-row justify-center mt-8">
        <Text className="text-md font-jost-bold text-text-primary ">
          <FormattedMessage
            id="DONT_HAVE_AN_ACCOUNT"
            defaultMessage="Don't have an account?"
          />
        </Text>
        <Link
          href="/register"
          className="text-primary-600 text-md font-jost-bold underline"
        >
          <FormattedMessage id="REGISTER" defaultMessage="Register" />
        </Link>
      </View>
    </View>
  );
};

export default Login;
