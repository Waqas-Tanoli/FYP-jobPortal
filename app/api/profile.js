import Cookies from "js-cookie";
import axiosClient from "../_utils/axiosClient";
import qs from "qs";

// Get user profile
export const getUserProfile = async (userId) => {
  try {
    const query = qs.stringify(
      {
        populate: {
          profilePicture: true,
          logo: true,
        },
      },
      { encodeValuesOnly: true }
    );

    const response = await axiosClient.get(`/users/${userId}?${query}`);

    return response.data;
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

    return response.data;
  } catch (error) {
    console.error("Error updating user profile:", error);
    throw error;
  }
};
