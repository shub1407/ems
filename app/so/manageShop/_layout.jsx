import { View, Text } from "react-native"
import { Tabs, Stack } from "expo-router"

export default function ManageShopLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ShopList" />
    </Stack>
  )
}
