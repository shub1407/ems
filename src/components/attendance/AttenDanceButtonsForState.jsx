import { View, Text, StyleSheet } from "react-native"
import React, { useContext } from "react"
import IconButton from "../IconButton"
import { MyContext } from "../../context/Context"
const AttendanceButtonsForState = ({ router }) => {
  const { userId } = useContext(MyContext)
  return (
    <View style={styles.container}>
      <IconButton
        label="Mark Attendance"
        icon="settings"
        onPress={() => {
          router.navigate("/stateHead/attendance/mark-attendance")
        }}
      />
      <IconButton
        label="Attendance Report"
        icon="settings"
        onPress={() => {
          router.navigate({
            pathname: "/stateHead/attendance/attendance-report",
            params: {
              userId,
            },
          })
        }}
      />
      <IconButton
        label="Leave Request"
        icon="settings"
        onPress={() => {
          router.navigate("/stateHead/attendance/leave-request")
        }}
      />
      <IconButton
        label="Attendance Report of So"
        icon="settings"
        onPress={() => {
          router.navigate("/stateHead/attendance/so-list")
        }}
      />
      <IconButton
        label="Leave Request of So"
        icon="settings"
        onPress={() => {
          router.navigate("/stateHead/attendance/leave-request-so")
        }}
      />
    </View>
  )
}

export default AttendanceButtonsForState

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 15,
    paddingTop: 10,
  },
})
