import axios from "@/axios/axiosInstance";
import * as SecureStore from "expo-secure-store";

const baseUrl = "YOUR_BACKEND_URL";

export const getHistory = async () => {
  const userToken = await SecureStore.getItemAsync("userToken");

  try {
    const response = await axios.get(`${baseUrl}/`, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching history:", error);
    throw error;
  }
};

export const deleteHistory = async (id: string) => {
  const userToken = await SecureStore.getItemAsync("userToken");

  try {
    const response = await axios.delete(`${baseUrl}/${id}`, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting history:", error);
    throw error;
  }
};

export const deleteAllHistory = async () => {
  const userToken = await SecureStore.getItemAsync("userToken");

  try {
    const response = await axios.delete(`${baseUrl}/`, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting all history:", error);
    throw error;
  }
};
