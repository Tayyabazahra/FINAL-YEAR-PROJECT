import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Navbar } from "@/components/Navbar";
import { Option } from "@/components/Option";
import { MoonIcon, SunIcon } from "@/components/icons";
import { useTheme } from "@/context/ThemeContext";
import { useIntl } from "react-intl";

type ThemeType = "light" | "dark" | "system";

const ThemeOptions = () => {
  const intl = useIntl();

  return [
    {
      id: 0,
      title: intl.formatMessage({
        id: "LIGHT_THEME",
        defaultMessage: "Light Theme",
      }),
      subtitle: intl.formatMessage({
        id: "LIGHT_THEME_DESCRIPTION",
        defaultMessage: "Use light theme for the app",
      }),
      icon: <SunIcon />,
      value: "light" as ThemeType,
    },
    {
      id: 1,
      title: intl.formatMessage({
        id: "DARK_THEME",
        defaultMessage: "Dark Theme",
      }),
      subtitle: intl.formatMessage({
        id: "DARK_THEME_DESCRIPTION",
        defaultMessage: "Use dark theme for the app",
      }),
      icon: <MoonIcon />,
      value: "dark" as ThemeType,
    },
  ];
};

export default function Theme() {
  const { theme, setTheme } = useTheme();
  const intl = useIntl();
  const [selectedOption, setSelectedOption] = useState<ThemeType>(theme);
  const [hasChanges, setHasChanges] = useState(false);
  const themeOptions = ThemeOptions();

  useEffect(() => {
    setSelectedOption(theme);
  }, [theme]);

  const handleOptionSelect = (value: ThemeType) => {
    setSelectedOption(value);
    setHasChanges(true);
  };

  const handleApplyChanges = () => {
    setTheme(selectedOption);
    setHasChanges(false);
  };

  return (
    <SafeAreaView className="flex-1 bg-neutral-50 dark:bg-neutral-950">
      <Navbar
        title={intl.formatMessage({
          id: "COLOR_THEME",
          defaultMessage: "Color Theme",
        })}
      />
      <View className="flex-1 relative">
        <View className="flex-1 p-4">
          <View className="mb-6">
            <Text className="text-xl font-semibold text-primary-text dark:text-neutral-50 mb-1">
              {intl.formatMessage({
                id: "COLOR_THEME",
                defaultMessage: "Color Theme",
              })}
            </Text>
            <Text className="text-sm text-secondary-text dark:text-neutral-300">
              {intl.formatMessage({
                id: "COLOR_THEME_DESCRIPTION",
                defaultMessage: "Choose your preferred color theme for the app",
              })}
            </Text>
          </View>

          <View className="gap-4">
            {themeOptions.map((option) => (
              <Option
                key={option.id}
                title={option.title}
                subtitle={option.subtitle}
                icon={option.icon}
                selected={selectedOption === option.value}
                onSelect={() => handleOptionSelect(option.value)}
              />
            ))}
          </View>
        </View>

        {hasChanges && (
          <View className="absolute bottom-0 left-0 right-0 p-4 bg-white dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-800">
            <TouchableOpacity
              className="bg-neutral-950 dark:bg-neutral-50 py-3 px-8 rounded-full w-full"
              onPress={handleApplyChanges}
              activeOpacity={0.8}
            >
              <Text className="text-base-white dark:text-neutral-950 text-center font-jost-medium text-sm">
                {intl.formatMessage({
                  id: "APPLY_CHANGES",
                  defaultMessage: "Apply Changes",
                })}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}
