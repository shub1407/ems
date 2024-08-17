import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableHighlight,
} from "react-native"
import React, { useContext } from "react"
import { leaveServices } from "../../../src/services/leaveServices"
import { useEffect, useState } from "react"
import { MyContext } from "../../../src/context/Context"
import LoadingSkeleton from "../../../src/components/LoadingSkeleton"
import LeaveCardToPass from "../../../src/components/attendance/LeaveCardToPass"
import UserInfo from "../../../src/components/attendance/UserInfo"
const LeaveRequestOfSo = () => {
  const { userId } = useContext(MyContext)
  const [loading, setLoading] = useState(true)
  const [filteredLeaveRequests, setFilteredLeaveRequests] = useState(null)
  const [selectedOption, setSelectedOption] = useState("All")
  const [leaveRequests, setLeaveRequests] = useState([])
  useEffect(() => {
    const fetchLeaveRequests = async () => {
      setLoading(true)
      try {
        const response = await leaveServices.listAssignedLeaves(userId)
        setLeaveRequests(response.data)
        setFilteredLeaveRequests(response.data)
      } catch (error) {
        console.error(error)
      }
      setLoading(false)
    }
    fetchLeaveRequests()
  }, [])
  function handleSelect(option) {
    if (selectedOption === option) {
      setFilteredLeaveRequests(leaveRequests)
      setSelectedOption("All")
    } else {
      setFilteredLeaveRequests(
        leaveRequests.filter((leave) => leave.status === option)
      )
      setSelectedOption(option)
    }
  }
  if (loading) {
    return <LoadingSkeleton />
  }
  console.log(leaveRequests)
  return (
    <ScrollView>
      <View style={styles.filterContainer}>
        <TouchableHighlight
          style={[
            styles.filterBtn,
            selectedOption === "Pending" &&
              (styles.selectedBtn,
              { backgroundColor: "orange", borderWidth: 0 }),
          ]}
          onPress={() => {
            handleSelect("Pending")
          }}
        >
          <Text
            style={[
              styles.filterText,
              selectedOption === "Pending" && styles.selectedText,
            ]}
          >
            Pending
          </Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={[
            styles.filterBtn,
            selectedOption === "Approved" &&
              (styles.selectedBtn,
              { backgroundColor: "green", borderWidth: 0 }),
          ]}
          onPress={() => {
            handleSelect("Approved")
          }}
        >
          <Text
            style={[
              styles.filterText,
              selectedOption === "Approved" && styles.selectedText,
            ]}
          >
            Approved
          </Text>
        </TouchableHighlight>

        <TouchableHighlight
          style={[
            styles.filterBtn,
            selectedOption === "Rejected" && styles.selectedBtn,
          ]}
          onPress={() => {
            handleSelect("Rejected")
          }}
        >
          <Text
            style={[
              styles.filterText,
              selectedOption === "Rejected" && styles.selectedText,
            ]}
          >
            Rejected
          </Text>
        </TouchableHighlight>
      </View>

      {filteredLeaveRequests.map((leaveRequest) => (
        <LeaveCardToPass key={leaveRequest._id} data={leaveRequest} />
      )) || <Text>No leave requests found</Text>}
    </ScrollView>
  )
}

export default LeaveRequestOfSo
const styles = StyleSheet.create({
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-start",
    padding: 10,
    gap: 15,
  },
  filterBtn: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 5,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "gray",
  },
  selectedBtn: {
    backgroundColor: "red",
    borderWidth: 0,
  },
  selectedText: {
    color: "white",
    fontWeight: "bold",
  },
})
