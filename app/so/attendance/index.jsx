import { View, Text } from "react-native"
import React from "react"
import UserInfo from "../../../src/components/attendance/UserInfo"
import { MyContext } from "../../../src/context/Context"
import { useContext } from "react"
import AttendanceButtons from "../../../src/components/attendance/AttendanceButtons"
import { router } from "expo-router"
const Attendance = () => {
  const { user } = useContext(MyContext)

  console.log("Hello", user)
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "start",
        marginHorizontal: 5,
        backgroundColor: "white",
      }}
    >
      <View style>
        <UserInfo user={user} />
      </View>
      {/* buttons */}
      <View style={{ flex: 1 }}>
        <AttendanceButtons router={router} />
      </View>
    </View>
  )
}

export default Attendance
