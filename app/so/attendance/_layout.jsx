import { View, Text } from "react-native"
import { Tabs, Stack } from "expo-router"

export default function AttendanceLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Attendance",
          headerStyle: {
            backgroundColor: "red",
          },
          headerTitleStyle: {
            color: "white",
            fontWeight: "bold",
          },
        }}
      />
      <Stack.Screen
        name="mark-attendance"
        options={{
          title: "Mark Attandance",
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
      />
      <Stack.Screen
        name="list-visit"
        options={{
          title: "Add Visit",
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
      />
      <Stack.Screen
        name="add-visit"
        options={{
          title: "Add Visit",
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
      />
      <Stack.Screen
        name="take-photo"
        options={{
          title: "Take Photo",
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
      />
      <Stack.Screen
        name="attendance-report"
        options={{
          title: "Attendance Report",
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
      />
      <Stack.Screen
        name="leave-request"
        options={{
          title: "Leave Requests",
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
      />
      <Stack.Screen
        name="add-leave"
        options={{
          title: "Apply Leave Request",
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
      />
    </Stack>
  )
}
