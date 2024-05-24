import { API_URL } from '@/config'
import Axios from 'axios'

export const axios = Axios.create({
  baseURL: API_URL
})

axios.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    const message = error.response?.data?.message || error.message
    console.error(message) // Implement some better logging in future
    return Promise.reject(error)
  }
)
