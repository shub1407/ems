import { Stack } from "expo-router"

export default function AttendanceLayout() {
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
        name="index"
        options={{
          title: "Attendance",
        }}
      />
      <Stack.Screen
        name="approve-leave"
        options={{
          title: "Action on Leave Request",
        }}
      />
      <Stack.Screen
        name="attendance-report-so"
        options={{
          title: "Report of So",
        }}
      />
      <Stack.Screen
        name="attendance-report-state-head"
        options={{
          title: "Report of State Head",
        }}
      />
      <Stack.Screen
        name="leave-request-state-head"
        options={{
          title: "Leave Request of State Head",
        }}
      />
      <Stack.Screen
        name="so-list"
        options={{
          title: "List of So ",
        }}
      />
      <Stack.Screen
        name="state-head-list"
        options={{
          title: "List of State Head ",
        }}
      />
    </Stack>
  )
}
