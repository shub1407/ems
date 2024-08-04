import React from "react"
import { useState, useEffect, useCallback } from "react"
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Image,
  ScrollView,
  Pressable,
  RefreshControl,
} from "react-native"
import { Link, useRouter } from "expo-router"
import { FontAwesome, Ionicons } from "@expo/vector-icons"
import { shopServices } from "../../../src/services/shopServices"
import * as SecureStore from "expo-secure-store"
import { useLocalSearchParams } from "expo-router"
import formatDate from "../../../src/utility/formatDate"
import { useFocusEffect } from "expo-router"
import ShopDetailComponent from "../../../src/components/ShopDetailComponent"
function OrderListComponent({ data, fetchData }) {
  let totalPayment = 0
  data.payments.forEach((payment) => {
    totalPayment += payment.amount
  })
  const router = useRouter()
  const dueAmount = data.totalAmount - totalPayment
  return (
    <Pressable
      onPress={() => {
        router.navigate({
          pathname: "admin/manageState/payment-list",
          params: { orderId: data._id },
        })
      }}
    >
      <View style={[styles.orderListContainer, { position: "relative" }]}>
        <View style={{ width: 80, position: "absolute", right: 10, top: 10 }}>
          {dueAmount <= 0 ? (
            <Text
              style={{
                backgroundColor: "green",
                color: "white",
                fontWeight: "bold",
                padding: 5,
                borderRadius: 5,
                textAlign: "center",
              }}
            >
              Paid
            </Text>
          ) : (
            <Text
              style={{
                backgroundColor: "red",
                color: "white",
                fontWeight: "bold",
                padding: 5,
                borderRadius: 5,
                textAlign: "center",
              }}
            >
              Unpaid
            </Text>
          )}
        </View>
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 20,
            textTransform: "capitalize",
            width: "75%",
          }}
        >
          OrderId: {data._id}
        </Text>
        <Text style={{ fontWeight: "bold", textTransform: "capitalize" }}>
          Amount: {data.totalAmount}
        </Text>
        <Text>Payment: {totalPayment}</Text>
        <Text>Due Amount: {dueAmount}</Text>
        <Text>Date of order: {formatDate(data.date)}</Text>
        <Text>Date of last payment: </Text>
      </View>
    </Pressable>
  )
}

function OrderList() {
  const { shopId } = useLocalSearchParams()
  const router = useRouter()
  const [orders, setOrders] = useState([])
  const [shop, setShop] = useState([])
  const [refreshing, setRefreshing] = useState(false)
  async function fetchData() {
    try {
      const token = await SecureStore.getItemAsync("token")
      const fetchedShop = await shopServices.getShopById(token, shopId)

      setShop(fetchedShop.data.shop)
      const fetchedOrders = await shopServices.getAllOrdersByShopId(shopId)

      setOrders(fetchedOrders.data.orders)
    } catch (error) {
      console.error("Error fetching shop: ", error)
    }
  }
  useEffect(() => {
    fetchData()
  }, [])
  //focus effect
  useFocusEffect(
    useCallback(() => {
      fetchData()
    }, [])
  )

  //refresh control
  const onRefresh = useCallback(() => {
    setRefreshing(true)

    fetchData().then(() => {
      setRefreshing(false)
    })
  }, [])

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <View>
        <ShopDetailComponent data={shop} fetchData={fetchData} />
      </View>
      <ScrollView
        style={{ marginTop: 0 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {orders.map((order) => (
          <OrderListComponent key={order._id} data={order} />
        ))}
      </ScrollView>
    </View>
  )
}
export default OrderList

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    paddingTop: 60,
    backgroundColor: "#fff",
    height: "100%",
  },
  shopDetailContainer: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    // flex: 1,
    height: "100%",
    flexDirection: "row",
    flexShrink: 1,
    gap: 20,
  },
  orderListContainer: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    flex: 1,
    flexShrink: 1,
    gap: 20,
  },

  image: {
    width: 150,
    height: "100%",

    resizeMode: "cover",
    borderRadius: 5,
    marginBottom: 10,
    marginLeft: 5,
    borderColor: "#ccc",
    borderWidth: 1,
    borderColor: "#ccc",
  },
  cardImageContainer: {
    width: "100%",
  },
  Text: {
    width: "100%",
  },
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
