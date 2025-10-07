import axios from 'axios';
import apiConfig from '../services/apiConfig';

const getAccessToken = async (): Promise<string> => {

  try {
    console.log('Token URL:', apiConfig.tokenUrl);
    const response = await axios.post(
      apiConfig.tokenUrl,
     new URLSearchParams({
        grant_type: 'client_credentials',
        client_id:   apiConfig.clientId,
        client_secret: apiConfig.clientSecret,
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );
    // Log the response to ensure we are getting the access token
    console.log('Token Response:', response.data);

    if (response.data?.data?.access_token) {
      console.log('Access token received:', response.data);
    return response.data.data.access_token;
    } else {
    throw new Error("No access token in response");
    }
  } catch (error: any) {
    console.error('Error fetching access token:', error.response?.data || error.message);
    throw new Error('Unable to fetch access token');
  }
};

export { getAccessToken };
