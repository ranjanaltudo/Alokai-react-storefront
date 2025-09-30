
const apiConfig = {
  clientId: import.meta.env.Ordercloud_APP_CLIENT_ID || '',
  clientSecret: import.meta.env.Ordercloud_APP_CLIENT_SECRET || '',
  tokenUrl: import.meta.env.Ordercloud_AUTH_TOKEN_URL || '',
};

export default apiConfig;