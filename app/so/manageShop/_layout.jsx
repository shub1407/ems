import { View, Text } from "react-native"
import { Tabs, Stack } from "expo-router"

export default function ManageShopLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: "red",
        },
        headerTitleStyle: {
          color: "white",
          fontWeight: "bold",
        },
        headerBackStyle: {
          color: "white",
          fontWeight: "bold",
        },
        headerBackTitle: "Back",
        headerTintColor: "white",
      }}
    >
      <Stack.Screen
        name="ShopList"
        options={{
          title: "Shop List",
        }}
      />
      <Stack.Screen
        name="add-order"
        options={{
          title: "Add Order",
        }}
      />
      <Stack.Screen
        name="add-payment"
        options={{
          title: "Add Payment",
        }}
      />
      <Stack.Screen
        name="AddShop"
        options={{
          title: "Add Shop",
        }}
      />
      <Stack.Screen
        name="order-list"
        options={{
          title: "Order List",
        }}
      />
      <Stack.Screen
        name="payment-list"
        options={{
          title: "Payment List",
        }}
      />
    </Stack>
  )
}
