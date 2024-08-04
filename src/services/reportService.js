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
async function generateReportForSo(soId, date) {
  try {
    const response = await axiosInstance.post(
      `/reports/so/generate/${soId}`,
      date
    )
    return response.data
  } catch (error) {
    console.error(`Error generating report: ${error.message}`)
    throw error
  }
}
async function generateReportForStateHead(state, date) {
  console.log("date hai bhai", date)
  try {
    const response = await axiosInstance.post(
      `/reports/state-head/generate/${state}`,
      date
    )
    return response.data
  } catch (error) {
    console.error(`Error generating report: ${error.message}`)
    throw error
  }
}
async function generateReportForAdmin() {
  try {
    const response = await axiosInstance.get(`/reports/admin/generate`)
    return response.data
  } catch (error) {
    console.error(`Error generating report: ${error.message}`)
    throw error
  }
}

async function generateReportForAdminByDate(date) {
  console.log("Date", date)
  try {
    const response = await axiosInstance.post(
      `/reports/admin/generate/date`,
      date
    )
    return response.data
  } catch (error) {
    console.error(`Error generating report: ${error.message}`)
    throw error
  }
}

export const reportServices = {
  generateReportForSo,
  generateReportForStateHead,
  generateReportForAdmin,
  generateReportForAdminByDate,
}
