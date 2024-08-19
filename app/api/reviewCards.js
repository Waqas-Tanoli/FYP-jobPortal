import axiosClient from "../_utils/axiosClient";

export const getReviewCards = async () => {
  try {
    const response = await axiosClient.get("review-cards?populate=*");
    return response.data;
  } catch (error) {
    console.error("Error fetching review cards:", error);
    throw new Error("Failed to fetch review cards.");
  }
};
