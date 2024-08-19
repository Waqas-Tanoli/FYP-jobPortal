const axios = require("axios");

// Retrieve API key from environment variables
const API_KEY = process.env.NEXT_PUBLIC_STRAPI_API_KEY;

// Create an Axios instance with base URL and authorization header
const axiosClient = axios.create({
  baseURL: "http://localhost:1337/api", // Base URL for API requests
  headers: {
    Authorization: `Bearer ${API_KEY}`, // Bearer token for authorization
  },
});

// API to get companies with populated fields
const getCompany = () => axiosClient.get("companies?populate=*");

// API to get review cards with populated fields
const getReviewCards = () => axiosClient.get("review-cards?populate=*");

// API to get user profile by user ID with populated fields
const getUserProfile = (userId) =>
  axiosClient.get(`users/${userId}?populate=*`);

// API to update user profile with multipart/form-data for file uploads
const updateUserProfile = (userId, profileData) =>
  axiosClient.put(`users/${userId}`, profileData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

// API to login with email and password
const login = async (email, password) => {
  try {
    const response = await axios.post("http://localhost:1337/api/auth/local", {
      identifier: email,
      password: password,
    });
    const { jwt, user } = response.data;
    // Store JWT and user data in local storage
    localStorage.setItem("jwt", jwt);
    localStorage.setItem("user", JSON.stringify(user));
    return { user, jwt }; // Return user data and JWT
  } catch (error) {
    console.error("Login failed", error); // Log error if login fails
    throw error; // Rethrow error to be handled by calling code
  }
};

// API to logout by clearing local storage
const logout = () => {
  localStorage.removeItem("jwt"); // Remove JWT from local storage
  localStorage.removeItem("user"); // Remove user data from local storage
};

// API to register a new user with username, email, and password
const register = async (username, email, password) => {
  try {
    const response = await axios.post(
      "http://localhost:1337/api/auth/local/register",
      {
        username,
        email,
        password,
      }
    );
    const { jwt, user } = response.data;
    // Store JWT and user data in local storage
    localStorage.setItem("jwt", jwt);
    localStorage.setItem("user", JSON.stringify(user));
    return { user, jwt }; // Return user data and JWT
  } catch (error) {
    console.error("Registration failed", error); // Log error if registration fails
    throw error; // Rethrow error to be handled by calling code
  }
};

// API to get all jobs with populated fields
const getJobs = () => axiosClient.get("jobs?populate=*");

// API to create a job entry
const createJobEntry = (jobData) => axiosClient.post("jobs", { data: jobData });

export default {
  getCompany,
  getReviewCards,
  getUserProfile,
  updateUserProfile,
  login,
  logout,
  register,
  getJobs,
  createJobEntry,
};
