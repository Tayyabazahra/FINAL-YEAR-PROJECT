import axios from "axios";

const baseUrl = `${import.meta.env.VITE_API_URL}`;

export const getHistory = async () => {
  try {
    const response = await axios.get(`${baseUrl}/history`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching history:", error);
    throw error;
  }
};

export const deleteHistory = async (id) => {
  try {
    const response = await axios.delete(`${baseUrl}/history/${id}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting history:", error);
    throw error;
  }
};

export const deleteAllHistory = async () => {
  try {
    const response = await axios.delete(`${baseUrl}/history`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting all history:", error);
    throw error;
  }
};
