import FontAwesome from "@expo/vector-icons/FontAwesome"
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
        }}
      />
      <Tabs.Screen
        name="manageShop"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <FontAwesome
              name="shopping-cart"
              size={26}
              color={focused ? "red" : "gray"}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="attendance"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <FontAwesome
              name="user-circle"
              size={26}
              color={focused ? "red" : "gray"}
            />
          ),
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
        }}
      />
    </Tabs>
  )
}
