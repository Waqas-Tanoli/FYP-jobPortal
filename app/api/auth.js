import Cookies from "js-cookie";
import axiosClient from "../_utils/axiosClient";
import { toast } from "react-toastify";

// Register function
export const register = async (
  username,
  email,
  password,
  profilePicture,
  Company,
  address,
  isCompany,
  location,
  logo,
  slogan,
  website,
  description
) => {
  try {
    const formData = new FormData();
    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("address", address);
    formData.append("Company", Company);
    formData.append("isCompany", isCompany);
    formData.append("location", location);
    formData.append("slogan", slogan);
    formData.append("website", website);
    formData.append("description", description);

    const slug = username.toString().toLowerCase().replace(/ /g, "-");
    formData.append("slug", slug);

    if (logo) {
      formData.append("logo", logo);
    }

    const response = await axiosClient.post("/auth/local/register", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    const { jwt, user } = response.data;
    Cookies.set("token", jwt, { expires: 30 });
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
    Cookies.remove("token");
    Cookies.remove("userId");
    toast.success("Logged out successfully.");

    window.location.reload();
  } catch (error) {
    console.error("Error logging out:", error.message);
    throw error;
  }
};

{
  /* 
  
  // Company Register function
export const registerCompany = async (
  username,
  email,
  password,
  location,
  logo,
  slogan,
  website,
  description
) => {
  try {
    const formData = new FormData();
    formData.append("name", username);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("location", location);
    formData.append("slogan", slogan);
    formData.append("website", website);
    formData.append("description", description);

    // Generate slug on company name
    const slug = username.toLowerCase().replace(/ /g, "-");
    formData.append("slug", slug);

    if (logo) {
      formData.append("logo", logo);
    }

    const response = await axiosClient.post("/auth/local/register", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    const company = response.data;
    return company;
  } catch (error) {
    console.error(
      "Error registering company:",
      error.response?.data || error.message
    );
    throw new Error(
      error.response?.data?.error?.message ||
        "An error occurred during company registration"
    );
  }
};
  */
}
