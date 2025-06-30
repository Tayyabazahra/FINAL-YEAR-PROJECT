import { Text, TouchableOpacity, View } from "react-native";
import * as SecureStore from "expo-secure-store";
import { useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { useRouter } from "expo-router";
import { FormattedMessage, useIntl } from "react-intl";

type User = {
  name: string;
  email: string;
  // Add other fields as needed
};

const Profile = () => {
  const router = useRouter();
  const intl = useIntl();
  const [profileDetails, setProfileDetails] = useState<User | null>(null);
  const getSecureValue = async (key: string) => {
    try {
      const value = await SecureStore.getItemAsync(key);
      if (value !== null) {
        console.log(`🔐 Value for key "${key}":`, value);
        return value;
      } else {
        console.log(`❌ No value found for key "${key}"`);
        return null;
      }
    } catch (error) {
      console.error("Error reading value from SecureStore:", error);
      return null;
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getSecureValue("user");
      if (user) {
        try {
          const parsedUser: User = JSON.parse(user);
          setProfileDetails(parsedUser);
        } catch (error) {
          console.error("Error parsing user:", error);
        }
      }
    };

    fetchUser();
  }, []);

  const handleLogout = async () => {
    await SecureStore.deleteItemAsync("user");
    await SecureStore.deleteItemAsync("userToken");
    router.replace("/(auth)/login");
  };

  return (
    <View className="bg-gray-50 dark:bg-[#1a1a1a] flex-1 min-h-screen ">
      <Navbar
        title={intl.formatMessage({
          id: "PROFILE",
          defaultMessage: "Profile",
        })}
      />
      <View className="px-5 py-8">
        {/* <View>
        <Text className="text-display-xs font-jost-medium text-text-primary dark:text-base-white">
          Profile
        </Text>
        <Text className="text-md font-jakarta-medium text-text-secondary dark:text-neutral-200">
          Below is given your profile overview, you can change from there
        </Text>
      </View> */}

        <View className="rounded-2xl overflow-hidden border border-neutral-100 dark:border-neutral-700">
          {/* Name  */}
          <View className="bg-neutral-50 dark:bg-neutral-900 p-5 px-8 border-b  border-neutral-100 dark:border-neutral-700 flex-row">
            <Text className="flex-1 font-jost-medium text-lg text-text-primary dark:text-neutral-50">
              <FormattedMessage id="NAME" defaultMessage="Name" />
            </Text>
            <Text className="flex-1 font-jost text-lg text-text-primary dark:text-neutral-50">
              {profileDetails?.name}
            </Text>
          </View>

          {/* Email  */}
          <View className="bg-neutral-50 dark:bg-neutral-900 border-b p-5 px-8  border-neutral-100 dark:border-neutral-700 flex-row">
            <Text className="flex-1 font-jost-medium text-lg text-text-primary dark:text-neutral-50">
              <FormattedMessage id="EMAIL" defaultMessage="Email" />
            </Text>
            <Text className="flex-1 font-jost text-lg text-text-primary dark:text-neutral-50">
              {profileDetails?.email}
            </Text>
          </View>

          {/* Logout Button  */}

          <View>
            <TouchableOpacity
              className="bg-neutral-50 dark:bg-neutral-900  p-5 px-8   flex-row"
              activeOpacity={0.8} // Reduces opacity when pressed
              onPress={handleLogout}
            >
              <Text className="flex-1 font-jost-medium text-lg text-rose-500 dark:text-rose-400">
                <FormattedMessage id="LOGOUT" defaultMessage="Logout" />
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Profile;
