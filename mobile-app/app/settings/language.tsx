import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, I18nManager } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Navbar } from "@/components/Navbar";
import { Option } from "@/components/Option";
import { useLanguage } from "@/context/LanguageContext";
import { EnglishIcon, UrduIcon } from "@/components/icons/LanguageIcons";
import { useIntl } from "react-intl";

type LanguageType = "en" | "ur";

const LanguageOptions = () => {
  const intl = useIntl();

  return [
    {
      id: 0,
      title: intl.formatMessage({ id: "ENGLISH" }),
      subtitle: intl.formatMessage({ id: "ENGLISH_DESCRIPTION" }),
      icon: <EnglishIcon />,
      value: "en" as LanguageType,
    },
    {
      id: 1,
      title: intl.formatMessage({ id: "URDU" }),
      subtitle: intl.formatMessage({ id: "URDU_DESCRIPTION" }),
      icon: <UrduIcon />,
      value: "ur" as LanguageType,
    },
  ];
};

export default function Language() {
  const { language, setLanguage } = useLanguage();
  const intl = useIntl();
  const [selectedOption, setSelectedOption] = useState<LanguageType>(language);
  const [hasChanges, setHasChanges] = useState(false);
  const languageOptions = LanguageOptions();

  useEffect(() => {
    setSelectedOption(language);
  }, [language]);

  const handleOptionSelect = (value: LanguageType) => {
    setSelectedOption(value);
    setHasChanges(true);
  };

  const handleApplyChanges = () => {
    setLanguage(selectedOption);
    setHasChanges(false);
  };

  const isRTL = I18nManager.isRTL;

  return (
    <SafeAreaView className="flex-1 bg-neutral-50 dark:bg-neutral-950">
      <Navbar title={intl.formatMessage({ id: "LANGUAGE" })} />
      <View className="flex-1 relative">
        <View className="flex-1 p-4">
          <View className="mb-6">
            <Text className="text-xl font-semibold text-primary-text dark:text-neutral-50 mb-1">
              {intl.formatMessage({ id: "LANGUAGE" })}
            </Text>
            <Text className="text-sm text-secondary-text dark:text-neutral-300">
              {intl.formatMessage({ id: "LANGUAGE_DESCRIPTION" })}
            </Text>
          </View>

          <View className="gap-4">
            {languageOptions.map((option) => (
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
          <View
            className={`absolute bottom-0 left-0 right-0 p-4 bg-white dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-800 ${
              isRTL ? "flex-row-reverse" : "flex-row"
            }`}
          >
            <TouchableOpacity
              className="bg-neutral-950 dark:bg-neutral-50 py-3 px-8 rounded-full w-full"
              onPress={handleApplyChanges}
              activeOpacity={0.8}
            >
              <Text className="text-base-white dark:text-neutral-950 text-center font-jost-medium text-sm">
                {intl.formatMessage({ id: "APPLY_CHANGES" })}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}
