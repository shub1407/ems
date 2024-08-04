//all api call
import axios from "axios"
import { baseUrl } from "../utility/constants"

const axiosInstance = axios.create({
  baseURL: baseUrl,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
})
// Error handling function
const handleApiError = (error) => {
  if (error.response) {
    console.error(
      `API Error: ${error.response.status} - ${error.response.data.message}`
    )
  } else if (error.request) {
    console.error("API Error: No response received from server")
  } else {
    console.error(`API Error: ${error.message}`)
  }
  throw error
}

async function listStateHead(state) {
  console.log(state)
  try {
    const response = await axiosInstance.get(`/admin/list-statehead`)
    return response.data
  } catch (error) {
    handleApiError(error)
  }
}

export const adminServices = { listStateHead }
