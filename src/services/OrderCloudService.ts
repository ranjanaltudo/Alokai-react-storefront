import axios from "axios";
import { getAccessToken } from "./AuthService";
import apiConfig  from "../services/apiConfig";

interface SearchFilters {
  brands?: string[];
  category?:string[];
}
 
const fetchProducts = async (filters: SearchFilters = {}) => {
  try {
    const accessToken = await getAccessToken();
    if (!accessToken) {
      console.error("No access token found.");
      return [];
    }

    const searchFilters: Record<string, any> = {};

    if (filters.brands && filters.brands.length > 0) {
      searchFilters["brand"] = filters.brands;
    }
    console.log("Calling fetchProducts with filters:", JSON.stringify(searchFilters, null, 2));

    const body = {
      page: 1,
      page_size: 100,
      includes: ["facets", "variants"],
      filters: searchFilters,
    };

    const response = await axios.post(apiConfig.searchUrl, body, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/json",
        "Cache-Control": "no-cache",
      },
    });

    const products = response?.data?.data?.items;
    if (!Array.isArray(products)){console.warn("fetchProducts: items is not array", products);return[];}
    return products;
  } catch (error: any) {
    console.error("Error fetching products:", error.response?.data || error.message);
    return [];
  }
};

// New function to fetch categories
const fetchCategories = async () => {
  try {
    const accessToken = await getAccessToken();
    if (!accessToken) {
      console.error("No access token found.");
      return [];
    }

    const body = {
      page: 1,
      page_size: 100,
    };

    const response = await axios.post(apiConfig.categoryUrl, body, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/json",
        "Cache-Control": "no-cache",
      },
    });

    const categories = response.data?.data?.items || [];
    const categoryIds = categories.map((cat: any) => cat.id.toLowerCase());
    console.log("Fetched category IDs:", categoryIds);
    return categoryIds;
  } catch (error: any) {
    console.error("Error fetching categories:", error.response?.data || error.message);
    return [];
  }
};
export { fetchProducts, fetchCategories};