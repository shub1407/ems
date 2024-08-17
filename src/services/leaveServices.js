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

// API calls
//apply leave
async function applyLeave(object) {
  try {
    const response = await axiosInstance.post(`/leave/apply`, object)
    return response.data
  } catch (error) {
    handleApiError(error)
  }
}

//get leave application list

async function listAllLeaves(userId) {
  try {
    const response = await axiosInstance.get(`/leave/list/${userId}`)
    return response.data
  } catch (error) {
    handleApiError(error)
  }
}

//list all assigned leaves

async function listAssignedLeaves(userId) {
  try {
    const response = await axiosInstance.get(`/leave/assigned/list/${userId}`)
    return response.data
  } catch (error) {
    handleApiError(error)
  }
}
//approve/reject leave request

async function approveOrRejectLeave(leaveId, object) {
  try {
    const response = await axiosInstance.post(
      `/leave/approve/${leaveId}`,
      object
    )
    return response.data
  } catch (error) {
    handleApiError(error)
  }
}

export const leaveServices = {
  applyLeave,
  listAllLeaves,
  listAssignedLeaves,
  approveOrRejectLeave,
}
