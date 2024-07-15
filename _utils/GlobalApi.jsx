const { default: axios } = require("axios");

const API_KEY = process.env.NEXT_PUBLIC_STRAPI_API_KEY;

const axoisClient = axios.create({
  baseURL: "http://localhost:1337/api",

  headers: {
    Authorization: `Bearer ${API_KEY}`,
  },
});

const getCompany = () => axoisClient.get("companies?populate=*");
export default {
  getCompany,
};
