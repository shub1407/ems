import { View, Text } from "react-native"
import { Tabs, Stack } from "expo-router"
import { MyProvider } from "../src/context/Context"
export default function RootLayout() {
  return (
    <MyProvider>
      <Stack />
    </MyProvider>
  )
}
