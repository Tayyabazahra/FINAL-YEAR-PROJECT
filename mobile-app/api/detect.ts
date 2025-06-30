import axios from "@/axios/axiosInstance";
import * as SecureStore from "expo-secure-store";

const baseUrl = "YOUR_BACKEND_URL";

interface DetectionResponse {
  status: "success" | "error";
  data: {
    result:
      | "Complex wound"
      | "Immediately treatable"
      | "No Ulcer"
      | "Treatable within 4 weeks";
  };
}

export const detect = async ({ imageUri }: { imageUri: string }) => {
  try {
    const userToken = await SecureStore.getItemAsync("userToken");

    console.log("Image URI", imageUri);

    // Extract file info
    const fileName = imageUri.split("/").pop();
    const fileType = fileName?.split(".").pop();

    const formData = new FormData();

    formData.append("file", {
      uri: imageUri,
      name: fileName || "image.jpg",
      type: `image/${fileType || "jpeg"}`,
    } as any);

    const response = await axios.post<DetectionResponse>(
      `${baseUrl}/`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${userToken}`,
        },
      }
    );

    return response;
  } catch (err) {
    console.error("Detect error:", err);
    throw err;
  }
};
