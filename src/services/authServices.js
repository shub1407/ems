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
async function signup(object) {
  const { name, email, password, phone, role, state, city } = object
  try {
    const response = await axiosInstance.post("/users/signup", {
      name,
      email,
      password,
      phone,
      role,
      state,
      city,
    })
    return response.data
  } catch (error) {
    handleApiError(error)
  }
}
async function login(object) {
  const { email, password } = object
  try {
    const response = await axiosInstance.post("/users/login", {
      email,
      password,
    })
    console.log(response.data)
    return response.data
  } catch (error) {
    handleApiError(error)
  }
}
async function changePassword(object) {
  try {
    const response = await axiosInstance.post("/users/change-password", object)
    return response.data
  } catch (error) {
    handleApiError(error)
  }
}
async function updateProfile(object) {
  try {
    const response = await axiosInstance.post("/users/update-profile", object)
    return response.data
  } catch (error) {
    handleApiError(error)
  }
}
async function getAuthStatus(token) {
  try {
    const response = await axiosInstance.get("/users/auth-status", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data
  } catch (error) {
    handleApiError(error)
  }
}

export const authServices = {
  signup,
  login,
  getAuthStatus,
  changePassword,
  updateProfile,
}
