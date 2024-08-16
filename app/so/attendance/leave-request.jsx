import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableHighlight,
} from "react-native"
import React, { useContext } from "react"
import { useEffect, useState } from "react"
import { leaveServices } from "../../../src/services/leaveServices"
import { MyContext } from "../../../src/context/Context"
import LeaveCard from "../../../src/components/attendance/LeaveCard"
import PlusButton from "../../../src/components/PlusButton"
import { router } from "expo-router"
import LoadingSkeleton from "../../../src/components/LoadingSkeleton"
const LeaveRequest = () => {
  const [leaveRequests, setLeaveRequests] = useState([])
  const [loading, setLoading] = useState(true)
  const [filteredLeaveRequests, setFilteredLeaveRequests] = useState(null)
  const { userId } = useContext(MyContext)
  const [selectedOption, setSelectedOption] = useState("All")
  async function fetchLeaveRequests() {
    setLoading(true)
    try {
      const response = await leaveServices.listAllLeaves(userId)
      setLeaveRequests(response.data)
      setFilteredLeaveRequests(response.data)
    } catch (error) {
      console.log(error)
    }
    setLoading(false)
  }
  useEffect(() => {
    fetchLeaveRequests()
  }, [])
  if (!loading) {
    console.log(leaveRequests)
  }
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

  return (
    <View style={styles.container}>
      <View>
        <View style={styles.filterContainer}>
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

        {loading ? (
          <LoadingSkeleton />
        ) : (
          <ScrollView>
            {leaveRequests.length === 0 && (
              <View>
                <Text
                  style={{
                    textAlign: "center",
                    marginTop: 20,
                    fontWeight: "bold",
                    fontSize: 25,
                  }}
                >
                  No leave requests found
                </Text>
              </View>
            )}
            {filteredLeaveRequests.map((leave) => (
              <LeaveCard key={leave._id} data={leave} />
            ))}
          </ScrollView>
        )}
      </View>
      <PlusButton
        onPress={() => {
          router.navigate("/so/attendance/add-leave")
        }}
      />
    </View>
  )
}

export default LeaveRequest
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
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
