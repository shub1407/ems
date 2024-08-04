import { View, Text } from "react-native"
import { Tabs, Stack } from "expo-router"

export default function EmployeeLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="so-list" />
    </Stack>
  )
}
