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

async function markAttendanceForSo(object) {
  try {
    const response = await axiosInstance.post(
      "/attendance/so/mark-attendance",
      object
    )
    return response.data
  } catch (error) {
    handleApiError(error)
  }
}
async function checkAttendanceForSo(object) {
  try {
    const response = await axiosInstance.post(
      "/attendance/so/check-attendance",
      object
    )
    return response.data
  } catch (error) {
    handleApiError(error)
  }
}
async function listShopsByDistrict(object) {
  try {
    const response = await axiosInstance.post(
      "/attendance/so/shop/district",
      object
    )
    return response.data
  } catch (error) {
    handleApiError(error)
  }
}
//add-visit

async function addVisit(object) {
  try {
    const response = await axiosInstance.post(
      "/attendance/so/shop/add-visit",
      object,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    )
    return response.data
  } catch (error) {
    handleApiError(error)
  }
}

//list-visits

async function listVisits(attendanceId) {
  try {
    const response = await axiosInstance.get(
      `/attendance/so/list-visits/${attendanceId}`
    )
    return response.data
  } catch (error) {
    handleApiError(error)
  }
}
//punch out

async function punchOut(attendanceId) {
  try {
    const response = await axiosInstance.post(
      `/attendance/so/punch-out/${attendanceId}`
    )
    return response.data
  } catch (error) {
    handleApiError(error)
  }
}

//get report
async function getAttendanceReport(userId) {
  try {
    const response = await axiosInstance.get(`/attendance/report/${userId}`)
    return response.data
  } catch (error) {
    handleApiError(error)
  }
}
export const attendanceServices = {
  markAttendanceForSo,
  checkAttendanceForSo,
  listShopsByDistrict,
  addVisit,
  listVisits,
  punchOut,
  getAttendanceReport,
}
