import { Navbar } from "@/components/Navbar";
import { Link } from "expo-router";
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useIntl } from "react-intl";
import { useTheme } from "@/context/ThemeContext";
import { useLanguage } from "@/context/LanguageContext";

export default function SettingsScreen() {
  const intl = useIntl();
  const { theme } = useTheme();
  const { language } = useLanguage();

  const getThemeText = () => {
    switch (theme) {
      case "light":
        return intl.formatMessage({ id: "LIGHT", defaultMessage: "Light" });
      case "dark":
        return intl.formatMessage({ id: "DARK", defaultMessage: "Dark" });
      case "system":
        return intl.formatMessage({ id: "SYSTEM", defaultMessage: "System" });
      default:
        return intl.formatMessage({ id: "SYSTEM", defaultMessage: "System" });
    }
  };

  const getLanguageText = () => {
    switch (language) {
      case "en":
        return intl.formatMessage({ id: "ENGLISH", defaultMessage: "English" });
      case "ur":
        return intl.formatMessage({ id: "URDU", defaultMessage: "اردو" });
      default:
        return intl.formatMessage({ id: "ENGLISH", defaultMessage: "English" });
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-neutral-50 dark:bg-neutral-950">
      <Navbar
        title={intl.formatMessage({
          id: "SETTINGS",
          defaultMessage: "Settings",
        })}
      />
      <View className="flex-1 p-4">
        <View>
          <Link href="/settings/language" asChild>
            <TouchableOpacity className="flex-row items-center justify-between p-4 border-b border-neutral-200 dark:border-neutral-800">
              <Text className="text-neutral-900 dark:text-neutral-50 text-lg font-jost-medium">
                {intl.formatMessage({
                  id: "LANGUAGE",
                  defaultMessage: "Language",
                })}
              </Text>
              <Text className="text-neutral-900 dark:text-neutral-50 text-lg font-jost-medium">
                {getLanguageText()}
              </Text>
            </TouchableOpacity>
          </Link>
        </View>

        <View>
          <Link href="/settings/theme" asChild>
            <TouchableOpacity className="flex-row items-center justify-between p-4 border-b border-neutral-200 dark:border-neutral-800">
              <Text className="text-neutral-900 dark:text-neutral-50 text-lg font-jost-medium">
                {intl.formatMessage({
                  id: "COLOR_THEME",
                  defaultMessage: "Color Theme",
                })}
              </Text>
              <Text className="text-neutral-900 dark:text-neutral-50 text-lg font-jost-medium">
                {getThemeText()}
              </Text>
            </TouchableOpacity>
          </Link>
        </View>

        {/* <View>
          <Link href="/settings/password" asChild>
            <TouchableOpacity className="flex-row items-center justify-between p-4 border-b border-neutral-200 dark:border-neutral-800">
              <Text className="text-neutral-900 dark:text-neutral-50 text-lg font-jost-medium">
                {intl.formatMessage({
                  id: "CHANGE_PASSWORD",
                  defaultMessage: "Change Password",
                })}
              </Text>
            </TouchableOpacity>
          </Link>
        </View> */}
      </View>
    </SafeAreaView>
  );
}
