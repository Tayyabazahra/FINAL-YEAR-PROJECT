import React, { useEffect, useState } from "react";
import { router, Tabs } from "expo-router";
import {
  ActivityIndicator,
  Image,
  Text,
  useColorScheme,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context"; // Import SafeAreaView
import { icons } from "@/constants/icons";
import { theme } from "@/constants/theme";
import * as SecureStore from "expo-secure-store";
import { FormattedMessage, useIntl } from "react-intl";

const TabIcon = ({ focused, icon, title }: any) => {
  const colorTheme = useColorScheme();

  if (focused) {
    return (
      <View className="flex p-2 items-center justify-center rounded-lg mt-5 bg-primary-400 dark:bg-primary-700 ">
        <View className="size-full justify-center items-center rounded-full min-h-24 min-w-[60px] gap-1">
          <Image
            source={icon}
            tintColor={
              colorTheme === "dark"
                ? theme.colors.primary[50]
                : theme.colors.neutral[900]
            }
            className="size-6"
          />
          <Text className="text-gray-900 dark:text-gray-50 text-sm font-jost ">
            {title}
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View className="size-full justify-center items-center rounded-full min-h-24 min-w-[80px] gap-1 mt-5">
      <Image
        source={icon}
        tintColor={colorTheme === "dark" ? "#cecece" : "#0f0d23"}
        className="size-6"
      />
      <Text className="text-gray-900 dark:text-gray-50 text-sm font-jost">
        {title}
      </Text>
    </View>
  );
};

const _layout = () => {
  const colorTheme = useColorScheme();
  const intl = useIntl();
  return (
    <SafeAreaView edges={["left", "right", "bottom"]} style={{ flex: 1 }}>
      {
        <Tabs
          screenOptions={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarItemStyle: {
              width: "100%",
              height: "100%",
              justifyContent: "center",
              alignItems: "center",
              marginTop: 4,
            },
            tabBarStyle: {
              height: 64,
              position: "absolute",
              overflow: "hidden",
              borderTopWidth: 1,
              borderColor:
                colorTheme === "dark"
                  ? theme.colors.neutral[900]
                  : theme.colors.neutral[200],
              paddingHorizontal: 16,
              backgroundColor:
                colorTheme === "dark" ? "#222222" : theme.colors.base.white,
            },
          }}
        >
          <Tabs.Screen
            name="index"
            options={{
              title: intl.formatMessage({
                id: "HOME",
                defaultMessage: "Home",
              }),
              headerShown: false,
              tabBarIcon: ({ focused }) => (
                <TabIcon
                  focused={focused}
                  icon={icons.home}
                  title={intl.formatMessage({
                    id: "HOME",
                    defaultMessage: "Home",
                  })}
                />
              ),
            }}
          />
          <Tabs.Screen
            name="detect"
            options={{
              title: intl.formatMessage({
                id: "DETECT",
                defaultMessage: "Detect",
              }),
              headerShown: false,
              tabBarIcon: ({ focused }) => (
                <TabIcon
                  focused={focused}
                  icon={icons.detect}
                  title={intl.formatMessage({
                    id: "DETECT",
                    defaultMessage: "Detect",
                  })}
                />
              ),
            }}
          />
          <Tabs.Screen
            name="doctors"
            options={{
              title: intl.formatMessage({
                id: "DOCTORS",
                defaultMessage: "Doctors",
              }),
              headerShown: false,
              tabBarIcon: ({ focused }) => (
                <TabIcon
                  focused={focused}
                  icon={icons.doctors}
                  title={intl.formatMessage({
                    id: "DOCTORS",
                    defaultMessage: "Doctors",
                  })}
                />
              ),
            }}
          />
          <Tabs.Screen
            name="history"
            options={{
              title: intl.formatMessage({
                id: "HISTORY",
                defaultMessage: "History",
              }),
              headerShown: false,
              tabBarIcon: ({ focused }) => (
                <TabIcon
                  focused={focused}
                  icon={icons.history}
                  title={intl.formatMessage({
                    id: "HISTORY",
                    defaultMessage: "History",
                  })}
                />
              ),
            }}
          />
          <Tabs.Screen
            name="settings"
            options={{
              title: intl.formatMessage({
                id: "SETTINGS",
                defaultMessage: "Settings",
              }),
              headerShown: false,
              tabBarIcon: ({ focused }) => (
                <TabIcon
                  focused={focused}
                  icon={icons.settings}
                  title={intl.formatMessage({
                    id: "SETTINGS",
                    defaultMessage: "Settings",
                  })}
                />
              ),
            }}
          />
        </Tabs>
      }
    </SafeAreaView>
  );
};

export default _layout;
