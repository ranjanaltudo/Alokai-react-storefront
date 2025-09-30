import axios from "axios";
import { getAccessToken } from "./AuthService";

const fetchProducts = async (productId?: string) => {
  try {
    // Check if token is already in localStorage
    let accessToken = localStorage.getItem('access_token');

    // If no token is found in localStorage, get a new one and store it
    if (!accessToken) {
      accessToken = await getAccessToken();
      localStorage.setItem('access_token', accessToken); // Store the token
    }

    const url = 'https://skinflintily-leporine-paulene.ngrok-free.dev/api/products/search/';
    console.log("Access Token being used:", accessToken);
    console.log("API Request URL:", url);

    // If no access token is available, log an error and exit
    if (!accessToken) {
      console.error("No access token found or token is empty.");
      return;
    }

    const body = productId ? { productId } : {};

    // Make the API request with the correct Authorization header
    const response = await axios.post(url, body, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/json",
        "Cache-Control": "no-cache",
        Pragma: "no-cache",
        Expires: "0",
        "ngrok-skip-browser-warning": "true",
      },
    });

    console.log("Response Status:", response.status);
    console.log("Response Data:", response.data);
    

    const products = response?.data?.data?.items;

    if (!Array.isArray(products)) {
      return []; 
    }

    return products;
  } catch (error: any) {
    console.error("Error fetching products:", error.response?.data || error.message);
    return []; 
  }
};

export { fetchProducts };
