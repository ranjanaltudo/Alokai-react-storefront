import { getAccessToken } from './auth'
import { getToken as getStoredToken, saveToken, clearToken as clearStoredToken } from '../utils/storage'

let inMemoryToken: string | null = null
let tokenExpiry: number | null = null

export const tokenService = {
  async getToken(): Promise<string> {
    const now = Date.now()

    // 1. Use in-memory token if valid
    if (inMemoryToken && tokenExpiry && now < tokenExpiry) {
      return inMemoryToken
    }

    // 2. Try from localStorage
    const stored = getStoredToken()
    if (stored.token && stored.expiry && now < stored.expiry) {
      inMemoryToken = stored.token
      tokenExpiry = stored.expiry
      return stored.token
    }

    // 3. Fetch new token from API
    const { access_token, expires_at } = await getAccessToken()

    if (!expires_at) {
      throw new Error('Token response missing expires_at')
    }

    const expiryTimestamp = new Date(expires_at).getTime()

    inMemoryToken = access_token
    tokenExpiry = expiryTimestamp

    saveToken(access_token, expiryTimestamp)

    return access_token
  },

  clearToken() {
    inMemoryToken = null
    tokenExpiry = null
    clearStoredToken()
  },
}