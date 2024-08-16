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
const LeaveCard = ({ data }) => {
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
      <View style={{ flex: 1, gap: 10, position: "relative" }}>
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
      </View>
    </ScrollView>
  )
}

export default LeaveCard
const styles = StyleSheet.create({
  status: {
    position: "absolute",
    right: 10,
    top: 0,

    color: "white",
    padding: 5,
    borderRadius: 5,
  },
  statusText: {
    fontWeight: "bold",
    color: "white",
  },
})
