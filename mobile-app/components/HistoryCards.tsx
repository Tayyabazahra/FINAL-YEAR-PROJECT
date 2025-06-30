import { Link } from "expo-router";
import { Text, View, Image } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { getHistory } from "@/api/history";
import { format } from "date-fns";
import { FormattedMessage } from "react-intl";

export const HistoryCards = () => {
  const { data: historyData, isLoading } = useQuery({
    queryKey: ["history"],
    queryFn: getHistory,
  });

  const history = historyData?.data?.history;
  const latestHistory = history?.slice(0, 2);

  return (
    <View className="gap-3 px-5 ">
      <View className="flex-row flex-1 items-center justify-between mt-8">
        <Text className=" text-text-primary dark:text-base-white text-xl font-jakarta-semibold">
          <FormattedMessage id="HISTORY" defaultMessage="History" />
        </Text>
        <Link
          href="/(tabs)/history"
          className="text-base font-jakarta-medium text-primary-500"
        >
          <FormattedMessage id="VIEW_ALL" defaultMessage="View all" />
        </Link>
      </View>
      <View className="flex-1 gap-4">
        {isLoading ? (
          <Text className="text-center text-text-primary dark:text-neutral-50">
            <FormattedMessage id="LOADING" defaultMessage="Loading..." />
          </Text>
        ) : latestHistory && latestHistory.length > 0 ? (
          latestHistory.map((item: any) => (
            <View
              key={item._id}
              className="bg-white dark:bg-[#2a2a2a] rounded-xl p-4 shadow-sm"
            >
              <Image
                source={{ uri: item.imgUrl }}
                className="w-full h-32 rounded-lg mb-3"
                resizeMode="cover"
              />
              <Text className="text-sm text-gray-500 dark:text-gray-400 font-jost">
                {format(new Date(item.createdAt), "MMM dd, yyyy HH:mm")}
              </Text>
              <Text className="text-lg font-jost-medium text-text-primary dark:text-neutral-50 mt-2">
                <FormattedMessage id="RESULT" defaultMessage="Result" />:{" "}
                {item.result}
              </Text>
            </View>
          ))
        ) : (
          <Text className="text-center text-text-primary dark:text-neutral-50">
            <FormattedMessage
              id="NO_HISTORY"
              defaultMessage="There is no history for now"
            />
          </Text>
        )}
      </View>
    </View>
  );
};
