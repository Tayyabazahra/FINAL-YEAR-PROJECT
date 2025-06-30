import { Link } from "expo-router";
import { FormattedMessage } from "react-intl";
import { Text, TouchableOpacity, View } from "react-native";

export const DetectCard = () => {
  return (
    <View className="p-6 m-5 rounded-[16px] bg-base-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
      <View>
        <Text className="text-text-primary dark:text-neutral-50 text-2xl font-jost-light">
          <FormattedMessage id="START_DETECTING" />
        </Text>
        <Text className="text-text-secondary dark:text-neutral-300 mt-2 text-base">
          <FormattedMessage
            id="DETECT_DESCRIPTION"
            defaultMessage="Detect your ulcer with only one-click using our precise AI algorithm today, free."
          />
        </Text>
      </View>
      <Link href="/detect" asChild>
        <TouchableOpacity
          className=" py-3 px-8 rounded-full dark:bg-neutral-50 bg-neutral-950  self-start mt-6"
          activeOpacity={0.8} // Reduces opacity when pressed
        >
          <Text className="text-base-white dark:text-neutral-950 text-center font-jost-medium text-sm">
            <FormattedMessage id="DETECT_ULCER" defaultMessage="Detect Ulcer" />
          </Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
};
