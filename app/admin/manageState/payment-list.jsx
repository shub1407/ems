import React from "react"
import { Text, View, ScrollView, StyleSheet, Pressable } from "react-native"
import { useLocalSearchParams, useRouter } from "expo-router"
import { shopServices } from "../../../src/services/shopServices"
import { useEffect, useState } from "react"
import formatDate from "../../../src/utility/formatDate"
import { FontAwesome, Ionicons } from "@expo/vector-icons"
import LoadingSkeleton from "../../../src/components/LoadingSkeleton"
function OrderDetailComponent({ data }) {
  console.log("data= ", data)
  const paymentCount = data.payments.length
  console.log("payment=", paymentCount)

  return (
    <View
      style={{
        borderColor: "gray",
        borderWidth: 1,
        borderRadius: 4,
        padding: 10,
        margin: 10,
        backgroundColor: "white",
      }}
    >
      <Text
        style={{
          fontWeight: "bold",
          textTransform: "capitalize",
          fontSize: 20,
          marginBottom: 20,
        }}
      >
        Customer: {data.shopId.name}({data.shopId.city})
      </Text>
      <View style={[styles.shopDetailContainer, { paddingRight: 10 }]}>
        <Text
          style={{
            fontWeight: "bold",

            textTransform: "capitalize",
          }}
        >
          OrderId: {data._id}
        </Text>

        <Text>Order Date: {formatDate(data.date)}</Text>
        {data.description && <Text>Description: {data.description}</Text>}

        <Text style={{ fontWeight: "bold", textTransform: "capitalize" }}>
          Amount:{data.totalAmount}
        </Text>
        <Text>Due : {data.totalAmount - data.totalPayment}</Text>
        <Text>Payment Count: {paymentCount}</Text>
      </View>
    </View>
  )
}

function PaymentListCard({ data }) {
  return (
    <View
      style={{
        borderWidth: 1,
        borderColor: "gray",
        borderRadius: 4,
        padding: 10,
        marginBottom: 10,
        backgroundColor: "white",
      }}
    >
      <Text style={{ textTransform: "capitalize" }}>
        Payment Method: {data.paymentMethod}
      </Text>
      <Text>Payment Amount: {data.amount}</Text>
      <Text>Payment Date: {formatDate(data.date)}</Text>
      {data.description && <Text>Description: {data.description}</Text>}
    </View>
  )
}

function PaymentList() {
  const router = useRouter()
  const { orderId } = useLocalSearchParams()
  const [order, setOrder] = useState([])
  const [payments, setPayments] = useState([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)
        const fetchedOrder = await shopServices.getOrderById(orderId)
        setOrder(fetchedOrder.data.order)
        setPayments(fetchedOrder.data.order.payments)
      } catch (error) {
        console.error("Error fetching shop: ", error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])
  console.log("order from api hai in payment list", order)
  if (loading) {
    return <LoadingSkeleton />
  }
  return (
    <View style={{ flex: 1, gap: 20, backgroundColor: "white" }}>
      <View style={{ paddingTop: 0 }}>
        <OrderDetailComponent data={order} />
      </View>
      <ScrollView
        style={{ padding: 10, margin: 10 }}
        showsVerticalScrollIndicator={false}
      >
        <Text style={{ fontWeight: "bold", textTransform: "capitalize" }}>
          Payments:
        </Text>

        {payments.map((payment, index) => (
          <PaymentListCard key={index} data={payment} />
        ))}
      </ScrollView>
    </View>
  )
}
export default PaymentList
const styles = StyleSheet.create({
  plusIcon: {
    position: "absolute",
    bottom: 80,
    right: 25,
    zIndex: 999,
    width: 50,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,

    shadowOpacity: 0.8,
    shadowRadius: 2,

    justifyContent: "center",
    alignItems: "center",
  },
})
