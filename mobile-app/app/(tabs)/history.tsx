import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import React from "react";
import { Navbar } from "@/components/Navbar";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getHistory, deleteHistory, deleteAllHistory } from "@/api/history";
import { Ionicons } from "@expo/vector-icons";
import { format } from "date-fns";
import { FormattedMessage, useIntl } from "react-intl";

const History = () => {
  const intl = useIntl();
  const queryClient = useQueryClient();
  const { data: historyData, isLoading } = useQuery({
    queryKey: ["history"],
    queryFn: getHistory,
  });

  const deleteHistoryMutation = useMutation({
    mutationFn: deleteHistory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["history"] });
    },
  });

  const deleteAllHistoryMutation = useMutation({
    mutationFn: deleteAllHistory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["history"] });
    },
  });

  const handleDeleteAll = () => {
    Alert.alert(
      intl.formatMessage({
        id: "DELETE_ALL_HISTORY",
        defaultMessage: "Delete All History",
      }),
      intl.formatMessage({
        id: "DELETE_ALL_HISTORY_DESCRIPTION",
        defaultMessage: "Are you sure you want to delete all history?",
      }),
      [
        {
          text: intl.formatMessage({
            id: "CANCEL",
            defaultMessage: "Cancel",
          }),
          style: "cancel",
        },
        {
          text: intl.formatMessage({
            id: "DELETE",
            defaultMessage: "Delete",
          }),
          style: "destructive",
          onPress: () => deleteAllHistoryMutation.mutate(),
        },
      ]
    );
  };

  const handleDelete = (id: string) => {
    Alert.alert(
      intl.formatMessage({
        id: "DELETE_HISTORY",
        defaultMessage: "Delete History",
      }),
      intl.formatMessage({
        id: "DELETE_HISTORY_DESCRIPTION",
        defaultMessage: "Are you sure you want to delete this history?",
      }),
      [
        {
          text: intl.formatMessage({
            id: "CANCEL",
            defaultMessage: "Cancel",
          }),
          style: "cancel",
        },
        {
          text: intl.formatMessage({
            id: "DELETE",
            defaultMessage: "Delete",
          }),
          style: "destructive",
          onPress: () => deleteHistoryMutation.mutate(id),
        },
      ]
    );
  };

  const history = historyData?.data?.history;

  console.log(history);

  if (isLoading) {
    return (
      <View className="bg-gray-50 dark:bg-[#1a1a1a] flex-1 min-h-screen">
        <Navbar
          title={intl.formatMessage({
            id: "HISTORY",
            defaultMessage: "History",
          })}
        />
        <View className="flex-1 items-center justify-center">
          <Text className="text-lg font-jost-medium text-text-primary dark:text-neutral-50">
            <FormattedMessage id="LOADING" defaultMessage="Loading..." />
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View className="bg-gray-50 dark:bg-[#1a1a1a] flex-1 min-h-screen">
      <Navbar
        title={intl.formatMessage({
          id: "HISTORY",
          defaultMessage: "History",
        })}
      />
      <View className="flex-1 px-4 mb-12">
        {history && history.length > 0 ? (
          <>
            <TouchableOpacity
              onPress={handleDeleteAll}
              className="flex-row items-center justify-end py-4"
            >
              <Ionicons name="trash-outline" size={20} color="#ef4444" />
              <Text className="text-red-500 ml-2 font-jost-medium">
                <FormattedMessage id="DELETE_ALL" defaultMessage="Delete All" />
              </Text>
            </TouchableOpacity>
            <ScrollView showsVerticalScrollIndicator={false}>
              {history.map((item: any) => (
                <View
                  key={item._id}
                  className="bg-white dark:bg-[#2a2a2a] rounded-xl p-4 mb-4 shadow-sm"
                >
                  <Image
                    source={{ uri: item.imgUrl }}
                    className="w-full h-48 rounded-lg mb-3"
                    resizeMode="cover"
                  />
                  <View className="flex-row justify-between items-center">
                    <Text className="text-sm text-gray-500 dark:text-gray-400 font-jost">
                      {format(new Date(item.createdAt), "MMM dd, yyyy HH:mm")}
                    </Text>
                    <View className="flex-row">
                      <TouchableOpacity
                        onPress={() => handleDelete(item._id)}
                        className="ml-4"
                      >
                        <Ionicons
                          name="trash-outline"
                          size={20}
                          color="#ef4444"
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                  <Text className="text-lg font-jost-medium text-text-primary dark:text-neutral-50 mt-2">
                    <FormattedMessage id="RESULT" defaultMessage="Result" />:{" "}
                    {item.result}
                  </Text>
                </View>
              ))}
            </ScrollView>
          </>
        ) : (
          <View className="flex-1 items-center justify-center">
            <Text className="text-lg font-jost-medium text-text-primary dark:text-neutral-50 text-center">
              <FormattedMessage
                id="NO_HISTORY"
                defaultMessage="There is no history for now"
              />
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default History;
