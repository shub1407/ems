import React, { useContext, useState } from "react"
import {
  ScrollView,
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Platform,
  Alert,
} from "react-native"
import DateTimePicker from "@react-native-community/datetimepicker"
import { Dropdown } from "react-native-element-dropdown"
import LoadingSkeleton from "../../../src/components/LoadingSkeleton"
import { MyContext } from "../../../src/context/Context"
import { leaveServices } from "../../../src/services/leaveServices"
import { router, useLocalSearchParams } from "expo-router"
const ApproveLeave = () => {
  const [status, setStatus] = useState(null)
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)

  const { leaveId } = useLocalSearchParams()
  console.log("Leave id hai", leaveId)
  async function handleSubmit() {
    setLoading(true)
    const obj = {
      status,
      message,
    }
    try {
      const response = await leaveServices.approveOrRejectLeave(leaveId, obj)

      setLoading(false)
      Alert.alert("Success", response.message)

      // Navigate to leave list page
      router.back()
      router.replace("/admin/attendance/leave-request-state-head")
      //reset
    } catch (error) {
      setLoading(false)
      Alert.alert("Error", error.message)
    }
  }

  return (
    <ScrollView style={[styles.container, { opacity: loading ? 0.4 : 1 }]}>
      <View>
        <Text style={styles.heading}>Approve/Reject Leave Request</Text>
      </View>

      <View>
        <Text style={styles.text}>Approve/Reject</Text>
        <Dropdown
          style={styles.dropdown}
          data={[
            { label: "Approve", value: "Approved" },
            { label: "Reject", value: "Rejected" },
          ]}
          mode="dropdown"
          searchPlaceholder="Search"
          labelField="label"
          valueField="value"
          placeholder="Choose Status"
          value={status}
          onChange={(item) => setStatus(item.value)}
        />
      </View>

      <View style={{ position: "relative" }}>
        <Text style={styles.text}>Enter Message</Text>
        <TextInput
          style={styles.inputBox}
          placeholder="Reason"
          value={message}
          onChangeText={(text) => setMessage(text)}
        />
      </View>

      <View>
        <TouchableOpacity
          style={[styles.btn, { marginBottom: 20, opacity: loading ? 0.2 : 1 }]}
          disabled={loading}
          onPress={handleSubmit}
        >
          <Text style={{ fontWeight: "bold", color: "white" }}>
            {status === "Approved"
              ? "Approve"
              : status === "Rejected"
              ? "Reject"
              : "Take Action"}
          </Text>
        </TouchableOpacity>
      </View>
      {loading && <LoadingSkeleton />}
    </ScrollView>
  )
}

export default ApproveLeave

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 40,
    backgroundColor: "white",
    paddingBottom: 10,
  },
  heading: {
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  text: {
    color: "red",
    fontWeight: "bold",
    marginBottom: 10,
  },
  datePicker: {
    borderWidth: 2,
    borderColor: "gray",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    justifyContent: "center",
  },
  inputBox: {
    borderColor: "gray",
    borderWidth: 2,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    fontSize: 16,
  },
  btn: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    marginTop: 30,
  },
  dropdown: {
    height: 45,
    borderColor: "gray",
    borderWidth: 2,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
})
