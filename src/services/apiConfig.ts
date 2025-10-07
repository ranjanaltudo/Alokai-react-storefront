const apiConfig = {
  clientId: import.meta.env.VITE_ORDERCLOUD_APP_CLIENT_ID || "",
  clientSecret: import.meta.env.VITE_ORDERCLOUD_APP_CLIENT_SECRET || "",
  tokenUrl: import.meta.env.VITE_ORDERCLOUD_AUTH_TOKEN_URL || "",
  searchUrl: import.meta.env.VITE_ORDERCLOUD_SEARCH_URL || "",
  categoryUrl: import.meta.env.VITE_ORDERCLOUD_CATEGORY_URL || "",
};
console.log("API Config Loaded:", apiConfig);
export default apiConfig;