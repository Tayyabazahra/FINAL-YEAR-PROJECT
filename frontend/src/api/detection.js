import axios from "axios";

const baseUrl = `${import.meta.env.VITE_API_URL}`;

export const detectUlcer = async (image) => {
  const formData = new FormData();
  formData.append("file", image);

  try {
    const response = await axios.post(`${baseUrl}/detections`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error detecting ulcer:", error);
    throw error;
  }
};
