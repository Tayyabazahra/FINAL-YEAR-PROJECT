import {
  View,
  Text,
  Image,
  Pressable,
  Linking,
  ScrollView,
} from "react-native";
import React from "react";
import { Navbar } from "@/components/Navbar";
import { images } from "@/constants/images";
import { FormattedMessage, useIntl } from "react-intl";

export const doctors = [
  {
    name: "Dr. Syed Iftikhar Ul Hameed",
    image: images.iftikhar,
    specialization:
      "Diabetologist, Hypertension Specialist, Consultant Physician, Endocrinologist",
    experience: "19",
    patientsCount: "478",
    satisfactionRate: "100%",
    consulationLink:
      "https://oladoc.com/pakistan/karachi/dr/diabetologist/syed-iftikhar-ul-hameed/2019307",
  },
  {
    name: "Dr. Mehak Hanif",
    image: images.mehak,
    specialization:
      "Internal Medicine Specialist, Diabetologist, Gastroenterologist, Endocrinologist",
    experience: "7",
    patientsCount: "750",
    satisfactionRate: "100%",
    consulationLink:
      "https://oladoc.com/pakistan/video-consultation/dr/internal-medicine-specialist/mehak-hanif-endocrinologist/2689222",
  },
  {
    name: "Dr. Munir Ahmed Channa",
    image: images.munir,
    specialization: "Diabetologist, Endocrinologist",
    experience: "12",
    patientsCount: "125",
    satisfactionRate: "4.2",
    consulationLink:
      "https://merisehat.pk/doctor/karachi/diabetologist/dr-munir-ahmed-channa/77465",
  },
];

const Doctors = () => {
  const intl = useIntl();
  const handleConsultation = (url: string) => {
    Linking.openURL(url);
  };

  return (
    <View className="bg-gray-50 dark:bg-[#1a1a1a] flex-1 min-h-screen pb-20">
      <Navbar
        title={intl.formatMessage({
          id: "DOCTORS",
          defaultMessage: "Doctors",
        })}
      />
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-5 mt-10">
          <Text className="text-display-xs font-jost text-text-primary dark:text-base-white">
            <FormattedMessage
              id="ULCER_SPECIALISTS"
              defaultMessage="Ulcer Specialists"
            />
          </Text>
          <Text className="mt-2 text-md font-jakarta-medium mb-8 dark:text-neutral-300">
            <FormattedMessage
              id="ULCER_SPECIALISTS_DESCRIPTION"
              defaultMessage="Below are some of the doctors who excel in Ulcer treatment."
            />
          </Text>
        </View>

        {/* Doctors Cards  */}
        <View className="gap-4 px-5 pb-32">
          {doctors.map((doctor, index) => (
            <View
              key={index}
              className="bg-base-white p-4 py-6 rounded-[12px] border border-neutral-200 dark:bg-neutral-900 dark:border-neutral-800"
            >
              <View className="flex-row items-center gap-4">
                <Image
                  source={doctor.image}
                  className="size-12 rounded-[24px]"
                />
                <View className="flex-1">
                  <Text className="text-base font-jakarta-bold text-text-primary dark:text-neutral-50">
                    {doctor.name}
                  </Text>
                  <Text className="text-sm font-jakarta-medium text-text-secondary dark:text-neutral-200">
                    {doctor.specialization}
                  </Text>
                  <View className="flex-row gap-4 mt-2">
                    <Text className="text-sm text-text-secondary dark:text-neutral-300">
                      <FormattedMessage
                        id="EXPERIENCE"
                        defaultMessage="Experience"
                      />
                      : {doctor.experience} years
                    </Text>
                    <Text className="text-sm text-text-secondary dark:text-neutral-300">
                      Patients: {doctor.patientsCount}
                    </Text>
                  </View>
                  <Text className="text-sm text-text-secondary dark:text-neutral-300 mt-1">
                    <FormattedMessage
                      id="SATISFACTION_RATE"
                      defaultMessage="Satisfaction Rate"
                    />
                    : {doctor.satisfactionRate}
                  </Text>
                </View>
              </View>
              <Pressable
                onPress={() => handleConsultation(doctor.consulationLink)}
                className="mt-4 bg-base-white border border-neutral-200 dark:bg-neutral-900 dark:border-neutral-800 py-3 px-4 rounded-lg"
              >
                <Text className="text-text-primary dark:text-neutral-50 text-center font-jakarta-medium">
                  <FormattedMessage
                    id="BOOK_CONSULTATION"
                    defaultMessage="Book Consultation"
                  />
                </Text>
              </Pressable>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default Doctors;
