const apiConfig = {
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || ""
};
console.log("API Config Loaded:", apiConfig);
export default apiConfig;