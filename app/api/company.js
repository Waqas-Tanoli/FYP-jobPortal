import axios from "../_utils/axiosClient";

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
