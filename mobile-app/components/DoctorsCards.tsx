import { images } from "@/constants/images";
import { Link } from "expo-router";
import { Image, Text, View } from "react-native";
import { doctors } from "@/app/(tabs)/doctors";
import { FormattedMessage } from "react-intl";

export const DoctorsCards = () => {
  return (
    <View className="gap-3 px-5 ">
      <View className="flex-row flex-1 items-center justify-between mt-8">
        <Text className=" text-text-primary dark:text-base-white text-xl font-jakarta-semibold">
          <FormattedMessage id="DOCTORS" defaultMessage="Doctors" />
        </Text>
        <Link
          href="/(tabs)/doctors"
          className="text-base font-jakarta-medium text-primary-500"
        >
          <FormattedMessage id="VIEW_ALL" defaultMessage="View all" />
        </Link>
      </View>
      <View className="flex-1 gap-4 ">
        {doctors.slice(0, 2).map((doctor, index) => (
          <View
            key={index}
            className="flex-row items-center gap-4 bg-base-white p-4 py-6 rounded-[12px] border border-neutral-200 dark:bg-neutral-900 dark:border-neutral-800 flex-1"
          >
            <Image source={doctor.image} className="size-12 rounded-[24px]" />
            <View>
              <Text className="text-base font-jakarta-bold text-text-primary dark:text-neutral-50">
                {doctor.name}
              </Text>
              <Text className="text-sm font-jakarta-medium text-text-secondary dark:text-neutral-200">
                {doctor.experience}{" "}
                <FormattedMessage
                  id="YEARS_OF_EXPERIENCE"
                  defaultMessage="years of experience"
                />
              </Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};
