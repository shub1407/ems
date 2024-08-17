import { View, Text, StyleSheet } from "react-native"
import React, { useContext } from "react"
import IconButton from "../IconButton"
import { MyContext } from "../../context/Context"
const AttendanceButtonsForAdmin = ({ router }) => {
  const { userId } = useContext(MyContext)
  return (
    <View style={styles.container}>
      <IconButton
        label="Attendance Report"
        icon="settings"
        onPress={() => {
          router.navigate({
            pathname: "/admin/attendance/state-head-list",
            params: {
              userId,
            },
          })
        }}
      />
      <IconButton
        label="Leave Request Of State Head"
        icon="settings"
        onPress={() => {
          router.navigate({
            pathname: "/admin/attendance/leave-request-state-head",
            params: {
              userId,
            },
          })
        }}
      />
    </View>
  )
}

export default AttendanceButtonsForAdmin

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 15,
    paddingTop: 10,
  },
})
