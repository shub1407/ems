import FontAwesome from "@expo/vector-icons/FontAwesome"
import { Tabs } from "expo-router"
import MaterialIcons from "@expo/vector-icons/MaterialIcons"

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          marginHorizontal: 0, // Adjust margin as needed
          paddingVertical: 5,
          backgroundColor: "white", // Set background color
        },
        tabBarLabelStyle: {
          fontSize: 12,
        },
      }}
    >
      <Tabs.Screen
        name="dashboard"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <FontAwesome
              name="home"
              size={26}
              color={focused ? "red" : "gray"}
            />
          ),
          tabBarLabel: "Home", // Set display name
        }}
      />
      <Tabs.Screen
        name="manageShop"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <MaterialIcons
              name="manage-accounts"
              size={26}
              color={focused ? "red" : "gray"}
            />
          ),
          tabBarLabel: "Manage Shop", // Set display name
        }}
      />
      <Tabs.Screen
        name="attendance"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <FontAwesome
              name="sticky-note"
              size={26}
              color={focused ? "red" : "gray"}
            />
          ),
          tabBarLabel: "Attendance", // Set display name
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <FontAwesome
              name="user-circle"
              size={26}
              color={focused ? "red" : "gray"}
            />
          ),
          tabBarLabel: "Profile", // Set display name
        }}
      />
    </Tabs>
  )
}
