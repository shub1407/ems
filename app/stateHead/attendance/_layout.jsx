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
        name="mark-attendance"
        options={{
          title: "Mark Attendance",
        }}
      />
      <Stack.Screen
        name="list-visit"
        options={{
          title: "List Visit",
        }}
      />
      <Stack.Screen
        name="add-visit"
        options={{
          title: "Add Visit",
        }}
      />
      <Stack.Screen
        name="take-photo"
        options={{
          title: "Take Photo",
        }}
      />
      <Stack.Screen
        name="leave-request"
        options={{
          title: "Leave Request",
        }}
      />
      <Stack.Screen
        name="attendance-report"
        options={{
          title: "Attendance Report",
        }}
      />
      <Stack.Screen
        name="add-leave"
        options={{
          title: "Add Leave",
        }}
      />
      <Stack.Screen
        name="so-list"
        options={{
          title: "List of So",
        }}
      />
      <Stack.Screen
        name="attendance-report-so"
        options={{
          title: "Attendance Report of So",
        }}
      />
    </Stack>
  )
}
