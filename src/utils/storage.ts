const TOKEN_KEY = 'access_token'
const EXPIRY_KEY = 'token_expiry'

export const saveToken = (token: string, expiresIn: number) => {
  const expiryTime = Date.now() + expiresIn * 1000
  localStorage.setItem(TOKEN_KEY, token)
  localStorage.setItem(EXPIRY_KEY, expiryTime.toString())
}

export const getToken = (): { token: string | null; expiry: number | null } => {
  const token = localStorage.getItem(TOKEN_KEY)
  const expiry = localStorage.getItem(EXPIRY_KEY)
  return {
    token,
    expiry: expiry ? parseInt(expiry, 10) : null,
  }
}

export const clearToken = () => {
  localStorage.removeItem(TOKEN_KEY)
  localStorage.removeItem(EXPIRY_KEY)
}