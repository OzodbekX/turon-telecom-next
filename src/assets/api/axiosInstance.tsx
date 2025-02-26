import axios from 'axios'
import i18n from 'i18next'
import { baseUrl } from 'Assets/volumes'
import { loadState } from 'Root/store/helper'
import { store } from 'Root/store'
import { setAuth, setUserInfo } from 'Root/store/userSlice'
import api from 'Assets/api/api'

const axiosInstance = axios.create({
  baseURL: baseUrl, // Replace with your API base URL
  headers: {
    'Content-Type': 'application/json',
  },
})
function clear() {
  store.dispatch(setUserInfo(undefined))
  store.dispatch(setAuth({ accessToken: undefined }))
}
// Optionally, you can set up interceptors for requests and responses here
// Add a request interceptor (e.g., to add auth tokens)
axiosInstance.interceptors.request.use(
  (config) => {
    // Modify the config before the request is sent, e.g., attach tokens
    if (i18n.language) {
      config.headers.Language = i18n.language
    } else {
      config.headers.Language = 'uz'
    }
    const state = loadState()
    if (state?.user?.accessToken) {
      config.headers.Authorization = 'Bearer ' + state?.user?.accessToken
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Add a response interceptor (e.g., to handle errors globally)
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    // Handle errors globally
    const originalRequest = error.config

    // If token is expired (401 Unauthorized), refresh the token
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      try {
        const newToken = await refreshToken()
        axiosInstance.defaults.headers.Authorization = `Bearer ${newToken}`
        originalRequest.headers.Authorization = `Bearer ${newToken}`
        return axiosInstance(originalRequest)
      } catch (refreshError) {
        console.error('Token refresh failed, logging out...')
        clear()
        return Promise.reject(refreshError)
      }
    }
    return Promise.reject(error)
  }
)

// Function to refresh the access token
const refreshToken = async () => {
  try {
    const state = loadState()
    const response = await axios.get(baseUrl + api.refreshToken, {
      headers: { Authorization: 'Bearer ' + state?.user?.refreshToken },
    })

    const newAccessToken = response.data.data.accessToken
    store.dispatch(setAuth(response.data.data))
    return newAccessToken
  } catch (error) {
    console.error('Refresh token failed', error)

    clear()
    throw error
  }
}

export default axiosInstance
