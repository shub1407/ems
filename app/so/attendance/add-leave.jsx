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
import { router } from "expo-router"
const AddLeave = () => {
  const [leaveType, setLeavetype] = useState(null)
  const [reason, setReason] = useState("")

  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())
  const [showStartDatePicker, setShowStartDatePicker] = useState(false)
  const [showEndDatePicker, setShowEndDatePicker] = useState(false)
  const [loading, setLoading] = useState(false)
  const { userId } = useContext(MyContext)
  // Functions to handle date change
  const onStartDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || startDate
    setShowStartDatePicker(Platform.OS === "ios")
    setStartDate(currentDate)
  }

  const onEndDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || endDate
    setShowEndDatePicker(Platform.OS === "ios")
    setEndDate(currentDate)
  }

  async function handleSubmit() {
    if (startDate > endDate) {
      Alert.alert("Error", "Start date should be less than end date")
      return
    }
    setLoading(true)
    const obj = {
      userId,
      leaveType,
      reason,
      startDate,
      endDate,
    }
    try {
      const response = await leaveServices.applyLeave(obj)

      setLoading(false)
      Alert.alert("Success", response.message)

      // Navigate to leave list page
      router.back()
      router.replace("/so/attendance/leave-request")
      // reset form
      setLeavetype(null)
      setReason("")
      setStartDate(new Date())
      setEndDate(new Date())
    } catch (error) {
      setLoading(false)
      Alert.alert("Error", error.message)
    }
  }

  return (
    <ScrollView style={[styles.container, { opacity: loading ? 0.4 : 1 }]}>
      <View>
        <Text style={styles.heading}>Apply Leave Request</Text>
      </View>

      <View>
        <Text style={styles.text}>From</Text>
        <TouchableOpacity onPress={() => setShowStartDatePicker(true)}>
          <View style={styles.datePicker}>
            <Text>{startDate.toDateString()}</Text>
          </View>
        </TouchableOpacity>
        {showStartDatePicker && (
          <DateTimePicker
            testID="startDatePicker"
            value={startDate}
            mode="date"
            display="default"
            onChange={onStartDateChange}
          />
        )}
      </View>

      <View>
        <Text style={styles.text}>To</Text>
        <TouchableOpacity onPress={() => setShowEndDatePicker(true)}>
          <View style={styles.datePicker}>
            <Text>{endDate.toDateString()}</Text>
          </View>
        </TouchableOpacity>
        {showEndDatePicker && (
          <DateTimePicker
            testID="endDatePicker"
            value={endDate}
            mode="date"
            display="default"
            onChange={onEndDateChange}
          />
        )}
      </View>

      <View>
        <Text style={styles.text}>Leave Type</Text>
        <Dropdown
          style={styles.dropdown}
          data={[
            { label: "Sick Leave", value: "Sick Leave" },
            { label: "Casual Leave", value: "Casual Leave" },
          ]}
          mode="dropdown"
          searchPlaceholder="Search"
          labelField="label"
          valueField="value"
          placeholder="Choose Leave Type"
          value={leaveType}
          onChange={(item) => setLeavetype(item.value)}
        />
      </View>

      <View style={{ position: "relative" }}>
        <Text style={styles.text}>Enter Reason</Text>
        <TextInput
          style={styles.inputBox}
          placeholder="Reason"
          value={reason}
          onChangeText={(text) => setReason(text)}
        />
      </View>

      <View>
        <TouchableOpacity
          style={[styles.btn, { marginBottom: 20, opacity: loading ? 0.2 : 1 }]}
          disabled={loading}
          onPress={handleSubmit}
        >
          <Text style={{ fontWeight: "bold", color: "white" }}>Apply</Text>
        </TouchableOpacity>
      </View>
      {loading && <LoadingSkeleton />}
    </ScrollView>
  )
}

export default AddLeave

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
