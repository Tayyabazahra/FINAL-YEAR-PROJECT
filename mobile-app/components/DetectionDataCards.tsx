import { Text, View } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { getHistory } from "../api/history";
import { FormattedMessage } from "react-intl";

interface HistoryItem {
  result: "Complex wound" | "No Ulcer" | string;
  // Add other properties as needed
}

interface Stats {
  total: number;
  complexWounds: number;
  noUlcer: number;
}

export const DetectionDataCards = () => {
  const {
    data: historyData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["history"],
    queryFn: getHistory,
  });

  const calculateStats = (data: any): Stats => {
    const history = data?.data?.history || [];
    return {
      total: history.length,
      complexWounds: history.filter(
        (item: HistoryItem) => item.result === "Complex wound"
      ).length,
      noUlcer: history.filter((item: HistoryItem) => item.result === "No Ulcer")
        .length,
    };
  };

  if (isLoading) {
    return (
      <View className="gap-3 px-5">
        <Text className="mt-5 text-text-primary dark:text-base-white text-xl font-jakarta-semibold">
          <FormattedMessage id="INSIGHTS" defaultMessage="Insights" />
        </Text>
        <View className="flex-row gap-2 items-start">
          {[1, 2, 3].map((_, index) => (
            <View
              key={index}
              className="bg-base-white p-4 rounded-[12px] border border-neutral-200 dark:bg-neutral-900 dark:border-neutral-800 flex-1 h-[120px]"
            >
              <Text className="text-sm font-jakarta text-text-primary dark:text-neutral-200">
                <FormattedMessage id="LOADING" defaultMessage="Loading..." />
              </Text>
            </View>
          ))}
        </View>
      </View>
    );
  }

  if (error) {
    return (
      <View className="gap-3 px-5">
        <Text className="mt-5 text-text-primary dark:text-base-white text-xl font-jakarta-semibold">
          <FormattedMessage id="INSIGHTS" defaultMessage="Insights" />
        </Text>
        <Text className="text-red-500">
          <FormattedMessage
            id="ERROR_LOADING_DATA"
            defaultMessage="Error loading data: {error}"
            values={{
              error:
                error instanceof Error ? error.message : "An error occurred",
            }}
          />
        </Text>
      </View>
    );
  }

  const stats = calculateStats(historyData);

  return (
    <View className="gap-3 px-5 ">
      <Text className="mt-5 text-text-primary dark:text-base-white text-xl font-jakarta-semibold">
        <FormattedMessage id="INSIGHTS" defaultMessage="Insights" />
      </Text>
      <View className="flex-row gap-2 items-start ">
        <View className="bg-base-white p-4 rounded-[12px] border border-neutral-200 dark:bg-neutral-900 dark:border-neutral-800 flex-1 h-[120px] flex justify-between">
          <Text className="text-sm font-jakarta text-text-primary dark:text-neutral-200">
            <FormattedMessage id="TOTAL" defaultMessage="Total" />
          </Text>
          <Text className="text-display-xs font-jost-medium text-text-primary dark:text-neutral-50">
            {stats.total}
          </Text>
        </View>
        <View className="bg-base-white p-4 rounded-[12px] border border-neutral-200 dark:bg-neutral-900 dark:border-neutral-800 flex-1 h-[120px] flex justify-between">
          <Text className="text-sm font-jakarta text-text-primary dark:text-neutral-200">
            <FormattedMessage
              id="COMPLEX_WOUNDS"
              defaultMessage="Complex Wounds"
            />
          </Text>
          <Text className="text-display-xs font-jost-medium text-text-primary dark:text-neutral-50">
            {stats.complexWounds}
          </Text>
        </View>
        <View className="bg-base-white p-4 rounded-[12px] border border-neutral-200 dark:bg-neutral-900 dark:border-neutral-800 flex-1 h-[120px] flex justify-between">
          <Text className="text-sm font-jakarta text-text-primary dark:text-neutral-200">
            <FormattedMessage id="NO_ULCER" defaultMessage="No Ulcer" />
          </Text>
          <Text className="text-display-xs font-jost-medium text-text-primary dark:text-neutral-50">
            {stats.noUlcer}
          </Text>
        </View>
      </View>
    </View>
  );
};
