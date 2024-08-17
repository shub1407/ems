import { View, Text } from "react-native"
import { Tabs, Stack } from "expo-router"

export default function ProfileLayout() {
  return (
    <Stack
      initialRouteName="index"
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
        name="index"
        initialRouteName
        options={{
          title: "Profile",
        }}
      />
      <Stack.Screen
        name="change-password"
        options={{
          title: "Change Password",
        }}
      />
      <Stack.Screen
        name="edit-profile"
        options={{
          title: "Edit Profile",
        }}
      />
    </Stack>
  )
}
