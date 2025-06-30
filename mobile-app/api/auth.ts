import axios from "@/axios/axiosInstance";

const baseUrl = "YOUR_BACKEND_URL";

export const login = async (body: any) => {
  try {
    const response = await axios.post(`${baseUrl}/login`, body);
    return response;
  } catch (err) {
    throw err;
  }
};

export const register = async (body: any) => {
  try {
    const response = await axios.post(`${baseUrl}/register`, body);
    return response;
  } catch (err) {
    throw err;
  }
};
