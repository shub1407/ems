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

//api calls
async function getAllShops(token) {
  try {
    const response = await axiosInstance.get("/shops/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    console.log("data from api hai ", response.data)
    return response.data
  } catch (error) {
    handleApiError(error)
  }
}
async function addShop({ token, object }) {
  try {
    const response = await axiosInstance.post("/shops/add", object, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    return response.data
  } catch (error) {
    handleApiError(error)
  }
}
async function getShopById(token, id) {
  try {
    const response = await axiosInstance.get(`/shops/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    return response.data
  } catch (error) {
    handleApiError(error)
  }
}
async function getAllOrdersByShopId(id) {
  try {
    const response = await axiosInstance.get(`/orders/${id}`)

    return response.data
  } catch (error) {
    handleApiError(error)
  }
}
async function getOrderById(orderId) {
  try {
    const response = await axiosInstance.get(`orders/get-orders/${orderId}`)
    console.log("orderId=", orderId)
    return response.data
  } catch (error) {
    handleApiError(error)
  }
}
async function addOrder(orderObject) {
  try {
    const response = await axiosInstance.post(
      `/orders/${orderObject.shopId}/add`,
      orderObject
    )

    return response.data
  } catch (error) {
    handleApiError(error)
  }
}

async function addPaymentToOrder(paymentObject) {
  const { orderId } = paymentObject
  try {
    const response = await axiosInstance.post(
      `/orders/${orderId}/add-payment`,
      paymentObject
    )
    return response.data
  } catch (error) {
    handleApiError(error)
  }
}
//exporting the api calls

export const shopServices = {
  getAllShops,
  addShop,
  getShopById,
  getAllOrdersByShopId,
  addOrder,
  getOrderById,
  addPaymentToOrder,
}
