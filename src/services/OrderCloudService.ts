import axios from "axios";
import { getAccessToken } from "./AuthService";
import apiConfig from "../services/apiConfig";

// Define filter structure
interface SearchFilters {
  brands?: string[];
  categories?: string[];
}

const fetchProducts = async (filters: SearchFilters = {}) => {
  try {
    const accessToken = await getAccessToken();
    if (!accessToken) {
      console.error("No access token found.");
      return { items: [], facets: [] };
    }

    const searchFilters: Record<string, any> = {};
    if (filters.brands?.length) searchFilters["Brand"] = filters.brands;
    if (filters.categories?.length) searchFilters["Category"] = filters.categories;

    const body = {
      page: 1,
      page_size: 20,
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

    const data = response?.data?.data;
    const items = Array.isArray(data?.items) ? data.items : [];
    const facets = Array.isArray(data?.meta?.facets) ? data.meta.facets : [];

    return { items, facets };
  } catch (error: any) {
    console.error("Error fetching products:", error.response?.data || error.message);
    return { items: [], facets: [] };
  }
};


export { fetchProducts };
