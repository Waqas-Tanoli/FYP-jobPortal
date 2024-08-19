import Cookies from "js-cookie";
import axiosClient from "../_utils/axiosClient";

// Register function
export const register = async (username, email, password) => {
  try {
    const response = await axiosClient.post("/auth/local/register", {
      username,
      email,
      password,
    });
    const { jwt, user } = response.data;
    Cookies.set("token", jwt, { expires: 30 }); // Store token for 30 days
    Cookies.set("userId", user.id, { expires: 30 });
    return user;
  } catch (error) {
    console.error("Error registering:", error.response?.data || error.message);
    throw new Error(
      error.response?.data?.error?.message ||
        "An error occurred during registration"
    );
  }
};

// Login function
export const login = async (email, password) => {
  try {
    const response = await axiosClient.post("/auth/local", {
      identifier: email,
      password,
    });
    const { jwt, user } = response.data;

    Cookies.set("token", jwt, { expires: 30 });
    Cookies.set("userId", user.id, { expires: 30 });

    return { user, jwt };
  } catch (error) {
    console.error("Login failed", error);
    throw new Error(
      error.response?.data?.error?.message ||
        "Login failed. Please check your credentials."
    );
  }
};

// Logout function
export const logout = () => {
  try {
    // Remove token and user ID from cookies
    Cookies.remove("token");
    Cookies.remove("userId");
  } catch (error) {
    console.error("Error logging out:", error.message);
    throw error;
  }
};
