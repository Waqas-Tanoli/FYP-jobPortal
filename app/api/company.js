import Cookies from "js-cookie";
import axiosClient from "../_utils/axiosClient";
import axios from "../_utils/axiosClient";
import qs from "qs";

//get all companiess
export const getCompany = async () => {
  try {
    const response = await axios.get("/companies?populate=*");
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching companies:",
      error.response ? error.response.data : error.message
    );

    throw error;
  }
};

//getting companies clugs
export const getCompanySlugs = async () => {
  const query = qs.stringify(
    {
      filters: {
        slug: {
          $eq: slug,
        },
      },
      populate: ["logo", "coverImage"],
    },
    {
      encodeValuesOnly: true,
    }
  );

  const res = await axiosClient.get(`/companies?${query}`);
  const rawSlugs = res.data.data;
  return rawSlugs;
};

//api for company job filtering

export const fetchPostedJobs = async (userId) => {
  try {
    const response = await axiosClient.get(
      `/jobs?filters[users_permissions_users][id][$eq]=${userId}&filters[users_permissions_users][isCompany][$eq]=true&populate[jobs][populate]=*`
    );
    console.log("API Response:", response);
    return response.data;
  } catch (error) {
    console.error(
      "Error in API call:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

//api to delete job
export const deleteJob = async (jobId) => {
  try {
    const response = await axiosClient.delete(`/jobs/${jobId}`);
    console.log("Delete Job Response:", response);
    return response.data;
  } catch (error) {
    console.error(
      "Error in API call:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};
