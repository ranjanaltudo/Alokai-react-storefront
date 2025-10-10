import axios from 'axios'
import apiConfig from './apiConfig'

const getAccessToken = async (): Promise<{ access_token: string; expires_at: number }> => {
  const response = await axios.post(
    apiConfig.apiBaseUrl + '/auth/token'
  )

  const tokenData = response.data?.data
  if (!tokenData?.access_token) {
    throw new Error('Access token not received')
  }

  return {
    access_token: tokenData.access_token,
    expires_at: tokenData.expires_at,
  }
}

export { getAccessToken }
