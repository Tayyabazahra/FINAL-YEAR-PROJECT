import { DetectCard } from "@/components/DetectCard";
import { DetectionDataCards } from "@/components/DetectionDataCards";
import { DoctorsCards } from "@/components/DoctorsCards";
import { HistoryCards } from "@/components/HistoryCards";
import { Navbar } from "@/components/Navbar";
import { useIntl } from "react-intl";

import { ScrollView, View } from "react-native";
import * as SecureStore from "expo-secure-store";
import { router } from "expo-router";

const Index = () => {
  const intl = useIntl();
  const isAuthenticated = async () => {
    const user = await SecureStore.getItemAsync("user");
    return user;
  };

  if (!isAuthenticated()) return router.push("/(auth)/login");

  console.log("isAuthenticated", isAuthenticated());
  return (
    <View className="bg-gray-50 dark:bg-[#1a1a1a] flex-1 min-h-screen">
      <Navbar
        title={intl.formatMessage({
          id: "DASHBOARD",
          defaultMessage: "Dashboard",
        })}
      />
      <ScrollView className="mb-24">
        <DetectCard />
        <DetectionDataCards />
        <DoctorsCards />
        <HistoryCards />
      </ScrollView>
    </View>
  );
};

export default Index;
