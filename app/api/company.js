import axios from "../_utils/axiosClient";
import qs from "qs";
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
