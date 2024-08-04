import { View, Text } from "react-native"
import { Tabs, Stack } from "expo-router"
import EditProfile from "../../../src/components/EditProfile"
export default function ProfileLayout() {
  return <Stack screenOptions={{ headerShown: false }} />
}
