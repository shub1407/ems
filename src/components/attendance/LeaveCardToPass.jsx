import {
  View,
  Text,
  ScrollView,
  Pressable,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native"
import React from "react"
import { router } from "expo-router"
import formatDate from "../../utility/formatDate"
import { calculateDaysBetween } from "../../utility/formatDate"
import UserInfo from "./UserInfo"
const LeaveCardToPass = ({ data }) => {
  const user = {
    name: data.userId.name,
    phone: data.userId.phone,
    email: data.userId.email,
    city: data.userId.city,
  }
  return (
    <ScrollView
      style={{
        margin: 10,
        backgroundColor: "white",
        borderColor: "gray",
        borderWidth: 2,
        borderRadius: 5,
        padding: 10,
      }}
    >
      <TouchableOpacity
        onPress={() => {
          if (data.isActive) {
            router.navigate({
              pathname: "/stateHead/attendance/approve-leave",
              params: { leaveId: data._id },
            })
          }
        }}
      >
        <View
          style={{
            flex: 1,
            gap: 10,
            position: "relative",
            backgroundColor: "white",
          }}
        >
          {/* For Leave Request of So & State Head */}
          <UserInfo user={user} general={true} />
          {/* For Leave Request of So & State Head Ends Here */}

          <Text
            style={{
              fontWeight: "bold",

              textTransform: "capitalize",
            }}
          >
            From: {formatDate(data.startDate)}
          </Text>
          <Text
            style={{
              fontWeight: "bold",

              textTransform: "capitalize",
            }}
          >
            To: {formatDate(data.endDate)}
          </Text>
          <Text>
            Total Days: {calculateDaysBetween(data.startDate, data.endDate)}
          </Text>
          <Text>Leave Type: {data.leaveType}</Text>
          <Text>Reason: {data.reason}</Text>
          {/* status */}
          <View
            style={[
              styles.status,
              {
                backgroundColor:
                  data.status === "Pending"
                    ? "orange"
                    : data.status === "Rejected"
                    ? "red"
                    : "green",
              },
            ]}
          >
            <Text style={styles.statusText}>{data.status} </Text>
          </View>
          {data.message && (
            <Text>
              <Text style={{ fontWeight: "bold" }}>Message: </Text>
              {data.message}
            </Text>
          )}
        </View>
      </TouchableOpacity>
    </ScrollView>
  )
}

export default LeaveCardToPass
const styles = StyleSheet.create({
  status: {
    color: "white",
    padding: 5,
    borderRadius: 5,
  },
  statusText: {
    fontWeight: "bold",
    color: "white",
  },
})
