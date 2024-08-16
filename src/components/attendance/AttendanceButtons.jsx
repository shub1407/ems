import { View, Text, StyleSheet } from "react-native"
import React from "react"
import IconButton from "../IconButton"
const AttendanceButtons = ({ router }) => {
  return (
    <View style={styles.container}>
      <IconButton
        label="Mark Attendance"
        icon="settings"
        onPress={() => {
          router.navigate("/so/attendance/mark-attendance")
        }}
      />
      <IconButton
        label="Attendance Report"
        icon="settings"
        onPress={() => {
          router.navigate("/so/attendance/attendance-report")
        }}
      />
      <IconButton
        label="Leave Request"
        icon="settings"
        onPress={() => {
          router.navigate("/so/attendance/leave-request")
        }}
      />
    </View>
  )
}

export default AttendanceButtons

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 15,
    paddingTop: 10,
  },
})
