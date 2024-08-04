import FontAwesome from "@expo/vector-icons/FontAwesome"
import MaterialIcons from "@expo/vector-icons/MaterialIcons"
import { Tabs } from "expo-router"

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
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
        name="manageEmployee"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <MaterialIcons
              name="manage-accounts"
              size={26}
              color={focused ? "red" : "gray"}
            />
          ),
          tabBarLabel: "Employee", // Set display name
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
