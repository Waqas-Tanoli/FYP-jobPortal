import Cookies from "js-cookie";
import axiosClient from "../_utils/axiosClient";

//get user profilesa
export const getUserProfile = async (userId) => {
  try {
    const response = await axiosClient.get(`/users/${userId}?populate=*`);
    return response.data; // Ensure this includes `username`
  } catch (error) {
    console.error("Error fetching user profile:", error);
    throw error;
  }
};

// Update user profile
export const updateUserProfile = async (userId, profileData) => {
  try {
    const token = Cookies.get("token");
    if (!token) {
      throw new Error("No token found");
    }

    const response = await axiosClient.put(`/users/${userId}`, profileData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("Update response:", response.data); // Log response
    return response.data;
  } catch (error) {
    console.error(
      "Error updating user profile:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};
