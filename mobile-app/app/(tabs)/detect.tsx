import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React, { useCallback, useState } from "react";
import { Navbar } from "@/components/Navbar";
import CustomImagePicker from "@/components/CustomImagePicker";
import { UlcerStatus } from "@/components/UlcerStatus";
import { useFocusEffect } from "expo-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { detect } from "@/api/detect";
import { AxiosResponse } from "axios";
import * as SecureStore from "expo-secure-store";
import { FormattedMessage, useIntl } from "react-intl";

type DetectionResult =
  | "Complex wound"
  | "Immediately treatable"
  | "No Ulcer"
  | "Treatable within 4 weeks";

interface ResultData {
  title: string;
  description: string;
}

interface DetectionResponse {
  status: "success" | "error";
  data: {
    result: DetectionResult;
  };
}

interface DetectRequestBody {
  imageUri: string;
}

const resultsObj: Record<DetectionResult, ResultData> = {
  "Complex wound": {
    title: "COMPLEX_WOUND",
    description: "COMPLEX_WOUND_DESCRIPTION",
  },
  "Immediately treatable": {
    title: "IMMEDIATELY_TREATABLE",
    description: "IMMEDIATELY_TREATABLE_DESCRIPTION",
  },
  "No Ulcer": {
    title: "NO_ULCER",
    description: "NO_ULCER_DESCRIPTION",
  },
  "Treatable within 4 weeks": {
    title: "TREATABLE_WITHIN_4_WEEKS",
    description: "TREATABLE_WITHIN_4_WEEKS_DESCRIPTION",
  },
};

const badgeStyles = {
  "Complex wound": {
    bg: "bg-red-100 dark:bg-red-200/10",
    text: "text-red-800 dark:text-red-400",
  },
  "Immediately treatable": {
    bg: "bg-orange-100 dark:bg-orange-200/10",
    text: "text-orange-800 dark:text-orange-400",
  },
  "No Ulcer": {
    bg: "bg-yellow-100 dark:bg-yellow-200/10",
    text: "text-yellow-800 dark:text-yellow-400",
  },
  "Treatable within 4 weeks": {
    bg: "bg-green-100 dark:bg-green-200/10",
    text: "text-green-800 dark:text-green-400",
  },
};

const mapDetectionResultToStatus = (
  result: DetectionResult
):
  | "noUlcer"
  | "treatableWithin4Weeks"
  | "complexWounds"
  | "immediatelyTreatable" => {
  switch (result) {
    case "No Ulcer":
      return "noUlcer";
    case "Immediately treatable":
      return "immediatelyTreatable";
    case "Treatable within 4 weeks":
      return "treatableWithin4Weeks";
    case "Complex wound":
      return "complexWounds";
    default:
      return "noUlcer";
  }
};

const Detect = () => {
  const intl = useIntl();
  const [image, setImage] = useState<string | null>(null);
  const [result, setResult] = useState<ResultData | null>(null);
  const queryClient = useQueryClient();
  useFocusEffect(
    useCallback(() => {
      return () => {
        setResult(null);
      };
    }, [])
  );

  const { mutate: detectUlcer, isPending } = useMutation<
    AxiosResponse<DetectionResponse>,
    Error,
    DetectRequestBody
  >({
    mutationFn: detect,
    onSuccess: (response) => {
      const data = response.data;
      console.log(data);
      if (data.status !== "success") {
        // Handle error case
        console.log(data);
        return;
      }
      const result = data.data.result;
      setResult(resultsObj[result]);
      queryClient.invalidateQueries({ queryKey: ["history"] });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const handleDetect = async () => {
    const userToken = await SecureStore.getItemAsync("userToken");
    console.log("userToken", userToken);
    console.log(image);
    if (image) {
      detectUlcer({ imageUri: image });
    }
  };

  return (
    <View className="bg-base-white dark:bg-[#1a1a1a] flex-1 min-h-screen">
      <Navbar
        title={intl.formatMessage({
          id: "DETECT",
          defaultMessage: "Detect",
        })}
      />
      <ScrollView className="flex-1 pb-10">
        <View className="px-5 mt-10 ">
          <Text className="text-display-xs font-jost text-text-primary dark:text-base-white">
            <FormattedMessage
              id="START_DETECTING"
              defaultMessage="Start Ulcer Detection"
            />
          </Text>
          <Text className="mt-2 text-md font-jakarta-medium mb-8 dark:text-neutral-300">
            <FormattedMessage
              id="DETECT_DESCRIPTION"
              defaultMessage="Upload your image below to start ulcer detection, it is free and accurate to large extent."
            />
          </Text>
        </View>
        <CustomImagePicker isSensitive image={image} setImage={setImage} />

        {/* Detect button only when image is uploaded and results are not shown */}
        {image && !result && (
          <View className="px-5 mt-20">
            <TouchableOpacity
              className="py-3 px-8 rounded-full dark:bg-neutral-50 bg-neutral-950 mt-6"
              activeOpacity={0.8}
              onPress={handleDetect}
              disabled={isPending}
            >
              <Text className="text-base-white dark:text-neutral-950 text-center font-jost-medium text-sm">
                {isPending
                  ? intl.formatMessage({
                      id: "DETECTING",
                      defaultMessage: "Detecting...",
                    })
                  : intl.formatMessage({
                      id: "DETECT_ULCER",
                      defaultMessage: "Detect Ulcer",
                    })}
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Results */}
        {result && (
          <View className="px-5 mt-16 pb-64">
            <Text className="text-lg font-jost-medium text-text-primary dark:text-neutral-50">
              <FormattedMessage id="RESULTS" defaultMessage="Results" />
            </Text>
            <View className="flex-row gap-4 mt-8">
              <Text className="text-base font-jakarta-medium text-text-primary dark:text-neutral-200">
                <FormattedMessage id="CONDITION" defaultMessage="Condition" />
              </Text>
              <UlcerStatus
                status={mapDetectionResultToStatus(
                  Object.keys(resultsObj).find(
                    (key) =>
                      resultsObj[key as DetectionResult].title === result.title
                  ) as DetectionResult
                )}
              />
            </View>
            <Text className="text-base font-jakarta text-text-primary dark:text-neutral-100 mt-6 mb-4">
              <FormattedMessage
                id={result.description}
                defaultMessage={result.description}
              />
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default Detect;
