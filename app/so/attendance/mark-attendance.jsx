import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native"
import React, { useContext, useEffect } from "react"
import { useState } from "react"
import { Dropdown, MultiSelect } from "react-native-element-dropdown"
import { MyContext } from "../../../src/context/Context"
import { attendanceServices } from "../../../src/services/attendanceServices"
import getISTTime from "../../../src/utility/getIstTime"
import LoadingSkeleton from "../../../src/components/LoadingSkeleton"
import { useFocusEffect, router } from "expo-router"
import { useCallback } from "react"
const MarkAttandannce = () => {
  const [status, setStatus] = useState(null)

  const [district, setDistrict] = useState(null)
  const [date, setDate] = useState(null)
  const [loading, setLoading] = useState(true)
  const [attendanceReport, setAttendanceReport] = useState(null)
  //checking if so is present on that day or not
  const [present, setPresent] = useState(null)
  const { user } = useContext(MyContext)
  const cities = user.city
  //making data for dropdown  of district
  const districts = cities.map((city) => ({ label: city, value: city }))
  async function checkAttendance() {
    setLoading(true)
    try {
      const response = await attendanceServices.checkAttendanceForSo({
        userId: user._id,
        date: getISTTime(),
      })
      if (response.data.status === "present") {
        setPresent("present")
        setAttendanceReport(response.data)
        console.log(response.data)
      } else if (response.data.status === "absent") {
        setPresent("absent")
      } else if (response.data.status === "leave") {
        setPresent("leave")
        setStatus(null)
        setDistrict(null)
        setDate(null)
      } else {
        setPresent(false)
        setStatus(null)
        setDistrict(null)
        setDate(null)
      }
    } catch (error) {
      console.log("Error in checking attendance", error)
    }
    setLoading(false)
  }
  useEffect(() => {
    checkAttendance()
  }, [])
  useFocusEffect(
    useCallback(() => {
      checkAttendance()
    }, [])
  )

  console.log("present or not", present)
  async function handleSubmit() {
    // here we will send the data to server for marking attandance
    const dataSent = {
      status: status,
      districtVisited: district,
      date: getISTTime(),
      userId: user._id,

      role: user.role,
    }
    if (status === "present") dataSent.punchIn = getISTTime()
    console.log("Data to be sent: ", dataSent)
    try {
      const response = await attendanceServices.markAttendanceForSo(dataSent)
      alert(response.message)
      router.replace("/so/attendance/mark-attendance")
    } catch (error) {
      console.log("Some error occured", error)
    }

    // clear form after submission
    setStatus(null)
    setDistrict(null)
    setDate(null)
  }

  if (loading) return <LoadingSkeleton />
  if (present === "present") {
    router.replace({
      pathname: "/so/attendance/list-visit",
      params: {
        userId: user._id,
        date: attendanceReport.date,
        districtVisited: attendanceReport.districtVisited,
        punchIn: attendanceReport.punchIn,
        noOfShopVisited: attendanceReport.shopVisited.length,
        attendanceId: attendanceReport._id,
      },
    })
  } else if (present === "absent") {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>You are absent today.</Text>
        <TouchableOpacity onPress={handleSubmit} style={styles.button}>
          <Text style={styles.buttonText}>Mark As Present</Text>
        </TouchableOpacity>
      </View>
    )
  } else if (present === "leave") {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>You are on leave today.</Text>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Mark As Present</Text>
        </TouchableOpacity>
      </View>
    )
  }
  return (
    <View>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={{ height: 100 }}>
          <Text style={styles.heading}>Mark Your Attandance</Text>
          <Text style={[styles.subheading, { textTransform: "capitalize" }]}>
            {user.name}
          </Text>
        </View>

        {/* role & state or district based on role */}
        <View>
          <Text style={styles.text}>Select Status: </Text>
          <Dropdown
            style={styles.dropdown}
            data={[
              { label: "Present", value: "present" },
              { label: "Absent", value: "absent" },
              { label: "Leave", value: "leave" },
            ]}
            mode="modal"
            searchPlaceholder="Search"
            labelField="label"
            valueField="value"
            placeholder="Attandance Status"
            value={status}
            onChange={(s) => setStatus(s.value)}
          />
        </View>
        {/* if present then district to be visited */}
        {status === "present" && (
          <View>
            <Text style={styles.text}>Select District to be Visited: </Text>
            <Dropdown
              style={styles.dropdown}
              data={districts}
              mode="dropdown"
              searchPlaceholder="Search"
              labelField="label"
              valueField="value"
              placeholder="Select District"
              value={district}
              onChange={(s) => setDistrict(s.value)}
            />
          </View>
        )}

        <View>
          <TouchableOpacity
            style={styles.btn}
            underlayColor="yellow"
            onPress={handleSubmit}
          >
            <Text style={{ fontWeight: "bold", color: "white" }}>
              {status === "present" ? "Punch In" : "Mark Attendance"}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  )
}

export default MarkAttandannce
const styles = StyleSheet.create({
  container: {
    marginTop: 70,
    marginHorizontal: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 10,
    color: "black",
  },
  subheading: {
    fontSize: 18,
    color: "black",
    marginBottom: 10,
    fontWeight: "bold",
    color: "red",
  },
  inputBox: {
    borderColor: "gray",
    marginTop: 9,
    borderWidth: 2,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    fontSize: 16,
  },
  btn: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 5,
    marginTop: 40,
    marginBottom: 20,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: 50,
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
    shadowColor: "gray",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    cursor: "pointer",
  },
  text: {
    color: "red",
    fontWeight: "bold",
  },
  dropdown: {
    height: 45,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
})
