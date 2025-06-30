import axios from "axios";

const baseUrl = import.meta.env.VITE_API_URL; // Replace with your API URL

export const registerUser = async (body) => {
  try {
    const response = await axios.post(`${baseUrl}/auth/register`, body, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error during registration:", error);
    throw error.response ? error.response.data : error;
  }
};

export const loginUser = async (body) => {
  try {
    const response = await axios.post(`${baseUrl}/auth/login`, body, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error during login:", error);
    throw error.response ? error.response.data : error;
  }
};

export const forgotPassword = async (body) => {
  try {
    const response = await axios.post(`${baseUrl}/auth/forgot-password`, body, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error during password reset:", error);
    throw error.response ? error.response.data : error;
  }
};

export const resetPassword = async (body) => {
  try {
    const response = await axios.post(
      `${baseUrl}/auth/reset-password/${body.token}`,
      { password: body.password },
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error during password reset:", error);
    throw error.response ? error.response.data : error;
  }
};

export const getMe = async () => {
  try {
    const response = await axios.get(`${baseUrl}/auth/me`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching user info:", error);
    throw error.response ? error.response.data : error;
  }
};

export const logoutUser = async () => {
  try {
    const response = await axios.post(
      `${baseUrl}/auth/logout`,
      {},
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error during logout:", error);
    throw error.response ? error.response.data : error;
  }
};

export const changePassword = async (body) => {
  try {
    const response = await axios.post(`${baseUrl}/auth/change-password`, body, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error during password change:", error);
    throw error.response ? error.response.data : error;
  }
};

export const deleteMe = async () => {
  try {
    const response = await axios.delete(`${baseUrl}/auth/delete-me`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error during account deletion:", error);
    throw error.response ? error.response.data : error;
  }
};
