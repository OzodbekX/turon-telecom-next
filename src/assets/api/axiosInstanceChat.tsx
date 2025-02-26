import axios from 'axios'
import i18n from 'i18next'
import { chatBaseUrl } from 'Assets/volumes'
import { loadState } from 'Root/store/helper'

const axiosInstanceChat = axios.create({
  baseURL: `${chatBaseUrl}`, // Replace with your API base URL
  headers: {
    'Content-Type': 'application/json',
  },
})

// Optionally, you can set up interceptors for requests and responses here
// Add a request interceptor (e.g., to add auth tokens)
axiosInstanceChat.interceptors.request.use(
  (config) => {
    // Modify the config before the request is sent, e.g., attach tokens
    if (i18n.language) {
      config.headers.Language = i18n.language
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
axiosInstanceChat.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle errors globally
    return Promise.reject(error)
  }
)

export default axiosInstanceChat
