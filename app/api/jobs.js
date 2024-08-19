// Import axiosClient from the utils folder

import axiosClient from "../_utils/axiosClient";

export const getJobs = async () => {
  try {
    // Fetch all jobs
    const response = await axiosClient.get("/jobs?populate=*");
    return response.data;
  } catch (error) {
    console.error("Error fetching jobs:", error);
    throw error;
  }
};

export const createJobEntry = async (jobData) => {
  const response = await axiosClient.post("/jobs", jobData);
  return response.data;
};

// Alternative simpler functions
export const simpleGetJobs = () => axiosClient.get("jobs?populate=*");
export const simpleCreateJobEntry = (jobData) =>
  axiosClient.post("jobs", { data: jobData });
