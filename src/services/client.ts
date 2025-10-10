import axios from 'axios'
import { tokenService } from './tokenService'
import apiConfig from './apiConfig'

const client = axios.create({
  baseURL: apiConfig.apiBaseUrl,
  timeout: 10000,
})

client.interceptors.request.use(async (config) => {
  const token = await tokenService.getToken()
  config.headers.Authorization = `Bearer ${token}`
  return config
})

export default client