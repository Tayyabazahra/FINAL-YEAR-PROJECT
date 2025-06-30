import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Modal,
  useColorScheme,
  ImageBackground,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { icons } from "@/constants/icons";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import { BlurView } from "expo-blur";
import { FormattedMessage } from "react-intl";

type ImageUploaderProps = {
  isSensitive?: boolean;
  image: string | null;
  setImage: React.Dispatch<React.SetStateAction<string | null>>;
};

const ImageUploader = ({
  isSensitive,
  image,
  setImage,
}: ImageUploaderProps) => {
  const [showImage, setShowImage] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  useFocusEffect(
    useCallback(() => {
      return () => {
        setImage(null); // Reset image when leaving screen
      };
    }, [])
  );

  // 📸 Pick an image or take a photo
  const pickImage = async (useCamera: boolean) => {
    setModalVisible(false);

    let result = useCamera
      ? await ImagePicker.launchCameraAsync({
          allowsEditing: false,
          quality: 1,
        })
      : await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: false,
          quality: 1,
        });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const colorTheme = useColorScheme();

  return (
    <View className="items-center justify-center p-4">
      {/* If No Image Selected */}
      {!image && (
        <View className="w-full p-6 py-8 pb-14 rounded-lg border border-primary-200 bg-primary-50 items-center justify-center dark:bg-neutral-900 dark:border-neutral-800">
          <Image
            source={icons.addMediaImage}
            width={48}
            height={48}
            tintColor={colorTheme === "dark" ? "#fff" : "#000"}
          />
          <Text className="text-text-primary dark:text-neutral-50  text-sm font-semibold mt-4 font-jakarta-semibold">
            <FormattedMessage id="UPLOAD_IMAGE" defaultMessage="Upload Image" />
          </Text>
          <Text className="text-text-secondary dark:text-neutral-100 mt-2 text-xs text-center">
            <FormattedMessage
              id="UPLOAD_IMAGE_DESCRIPTION"
              defaultMessage="Upload your image below, only PNG and JPEG are supported for now."
            />
          </Text>

          <View className="absolute bottom-0 translate-y-1/2">
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <View className="mt-4 px-8 py-3  rounded-full flex-row items-center gap-[10px] bg-btn-secondary-bg">
                <Image source={icons.upload} width={24} height={24} />
                <Text className="text-text-primary text-sm font-jakarta-semibold">
                  <FormattedMessage id="UPLOAD" defaultMessage="Upload" />
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* If Image is Selected */}
      {image && (
        <ImageBackground
          source={{ uri: image }}
          height={200}
          style={{ borderRadius: 12 }}
          className="w-full rounded-lg  items-center justify-center  bg-center bg-cover over"
        >
          <View
            className={`w-full p-6 py-8 pb-14  items-center justify-center h-[200px] backdrop:blur-lg  ${
              !showImage && "dark:bg-neutral-900/80 bg-primary-50 "
            }`}
          >
            {isSensitive && !showImage && (
              <BlurView
                intensity={80} // Adjust for more blur
                tint="dark"
                className="absolute inset-0 items-center justify-center p-4"
              >
                <Text className="text-white text-sm font-semibold mt-4 font-jakarta-semibold">
                  <FormattedMessage
                    id="SENSITIVE_IMAGE"
                    defaultMessage="Sensitive Image"
                  />
                </Text>
                <Text className="text-white mt-2 text-xs text-center">
                  <FormattedMessage
                    id="SENSITIVE_IMAGE_DESCRIPTION"
                    defaultMessage="This image may be sensitive for some users to view, so it is hidden."
                  />
                </Text>
              </BlurView>
            )}

            <View className="absolute bottom-0 translate-y-1/2 flex-row gap-4">
              <TouchableOpacity onPress={() => setModalVisible(true)}>
                <View className="mt-4 px-6 py-3  rounded-full flex-row items-center gap-[10px] bg-btn-primary-bg dark:bg-neutral-50">
                  <Text className="text-base-white dark:text-text-primary text-sm font-jakarta-semibold">
                    <FormattedMessage
                      id="CHANGE_IMAGE"
                      defaultMessage="Change Image"
                    />
                  </Text>
                </View>
              </TouchableOpacity>

              {isSensitive && (
                <TouchableOpacity onPress={() => setShowImage((prev) => !prev)}>
                  <View className="mt-4 px-8 py-3  rounded-full flex-row items-center gap-[10px] bg-btn-secondary-bg">
                    <Text className="text-text-primary text-sm font-jakarta-semibold">
                      {showImage ? (
                        <FormattedMessage
                          id="HIDE_IMAGE"
                          defaultMessage="Hide Image"
                        />
                      ) : (
                        <FormattedMessage
                          id="SHOW_IMAGE"
                          defaultMessage="Show Image"
                        />
                      )}
                    </Text>
                  </View>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </ImageBackground>
        // <View className="w-full rounded-lg overflow-hidden bg-gray-200 p-4">
        //   {isSensitive && !showImage ? (
        //     // Blurred Image Placeholder
        //     <View className="h-48 w-full items-center justify-center bg-gray-300">
        //       <Text className="text-gray-700">Sensitive Image</Text>
        //       <Text className="text-gray-500 text-sm text-center">
        //         This image may be sensitive for some users to view, so it is
        //         hidden.
        //       </Text>
        //     </View>
        //   ) : (
        //     // Show Actual Image
        //     <Image source={{ uri: image }} className="h-48 w-full rounded-lg" />
        //   )}

        //   {/* Buttons */}
        //   <View className="flex-row justify-between mt-3">
        //     <TouchableOpacity
        //       onPress={() => setModalVisible(true)}
        //       className="p-3 bg-gray-900 rounded-lg flex-1 mx-1"
        //     >
        //       <Text className="text-white text-center">Change Image</Text>
        //     </TouchableOpacity>
        //     {isSensitive && (
        //       <TouchableOpacity
        //         onPress={() => setShowImage(!showImage)}
        //         className="p-3 bg-green-400 rounded-lg flex-1 mx-1"
        //       >
        //         <Text className="text-white text-center">
        //           {showImage ? "Hide Image" : "Show Image"}
        //         </Text>
        //       </TouchableOpacity>
        //     )}
        //   </View>
        // </View>
      )}

      {/* Modal for Selecting Upload Method */}
      <Modal visible={modalVisible} transparent animationType="fade">
        <View className="flex-1 justify-center items-center bg-black/50  px-6 ">
          <View className="bg-white dark:bg-neutral-800 p-6 rounded-lg w-full gap-4">
            <Text className="text-xl font-jost-medium mb-3 text-center text-text-primary dark:text-neutral-50">
              <FormattedMessage
                id="CHOOSE_OPTION"
                defaultMessage="Choose an option"
              />
            </Text>
            <View className="flex-row gap-4">
              <TouchableOpacity
                onPress={() => pickImage(false)}
                className="p-3 bg-neutral-100 border border-neutral-200 dark:bg-neutral-500 dark:border-neutral-400  rounded-lg mb-2 flex-1 h-32 items-center justify-center"
              >
                <Text className="text-text-primary  dark:text-base-white text-center text-sm font-jakarta-medium">
                  <FormattedMessage
                    id="CHOOSE_FROM_GALLERY"
                    defaultMessage="Choose from Gallery"
                  />
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => pickImage(true)}
                className="p-3 bg-neutral-100 border border-neutral-200 dark:bg-neutral-500 dark:border-neutral-400   rounded-lg mb-2 flex-1 h-32 items-center justify-center"
              >
                <Text className="text-text-primary dark:text-base-white text-center text-sm font-jakarta-medium">
                  <FormattedMessage
                    id="TAKE_A_PHOTO"
                    defaultMessage="Take a Photo"
                  />
                </Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              className="mt-3 p-2 text-center"
            >
              <Text className="text-neutral-700 dark:text-base-white font-jost-bold text-right text-sm">
                <FormattedMessage id="CANCEL" defaultMessage="Cancel" />
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ImageUploader;
