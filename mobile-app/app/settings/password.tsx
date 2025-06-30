import { Navbar } from "@/components/Navbar";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Password() {
  return (
    <SafeAreaView className="flex-1 bg-neutral-50 dark:bg-neutral-950">
      <Navbar title="Password" />
      <Text>Password</Text>
    </SafeAreaView>
  );
}
