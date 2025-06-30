import { images } from "@/constants/images";
import { Link } from "expo-router";
import React from "react";
import { Image, Text, View } from "react-native";

export const Navbar = ({ title }: { title: string }) => {
  return (
    <View className="flex-row items-center justify-between px-5 py-4  bg-base-white dark:bg-[#222222] border-b border-b-neutral-200 dark:border-neutral-900">
      {/* Welcome and Name */}
      <View className="justify-center">
        <Text className="text-2xl text-text-primary dark:text-neutral-50 font-jost-medium">
          {title}
        </Text>
      </View>

      {/* Profile Image (Fixed alignment issue) */}
      <Link href="/profile">
        <View className="justify-end flex-row flex-1">
          <Image source={images.profile} className="size-10 rounded-[20px]" />
        </View>
      </Link>
    </View>
  );
};
