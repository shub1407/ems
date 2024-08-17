import { View, Text } from "react-native"
import { Tabs, Stack } from "expo-router"

export default function EmployeeLayout() {
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
        name="so-list"
        options={{
          title: "Manage So",
        }}
      />
      <Stack.Screen
        name="shop-list"
        options={{
          title: "Shop List",
        }}
      />
      <Stack.Screen
        name="payment-list"
        options={{
          title: "Payment Detail",
        }}
      />
      <Stack.Screen
        name="order-list"
        options={{
          title: "Order List",
        }}
      />
      <Stack.Screen
        name="so-detail"
        options={{
          title: "So Sales report",
        }}
      />
    </Stack>
  )
}
