import {
  View,
  Text,
  Button,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native"
import React, { useContext } from "react"
import { Calendar, CalendarList, Agenda } from "react-native-calendars"
import { useState, useEffect } from "react"
import { attendanceServices } from "../../../src/services/attendanceServices"
import { MyContext } from "../../../src/context/Context"
import CalendarModal from "../../../src/components/attendance/CalendarModal"
import ListVisitForStateHead from "../../../src/components/attendance/ListVisitForStateHead"
import { convertUTCtoIST } from "../../../src/utility/formatDate"
import { leaveServices } from "../../../src/services/leaveServices"
import { getDateRange } from "../../../src/utility/formatDate"
import { useLocalSearchParams } from "expo-router"
const AttendanceReport = () => {
  const { userId, name, phone, email, role } = useLocalSearchParams()

  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  )
  console.log(selectedDate)
  const [modalVisible, setModalVisible] = useState(false)
  const [attendanceData, setAttendanceData] = useState({})
  const [calendarData, setCalendarData] = useState({})
  const [loading, setLoading] = useState(true)
  const [dataForReport, setDataForReport] = useState(null)
  const transformAttendanceData = (data, leaveDates) => {
    console.log("in transformAttendanceData", data)
    const markedDates = {}

    let summaryReport = {
      present: 0,
      absent: 0,
      leave: 0,
      holiday: 0,
    }
    leaveDates.forEach((date) => {
      summaryReport.leave++
      markedDates[date] = {
        selected: true,

        selectedColor: "orange",
      }
    })
    data.forEach((entry) => {
      let dotColor
      if (entry.status === "present") {
        dotColor = "green"
        summaryReport.present++
      } else if (entry.status === "absent") {
        dotColor = "red"
        summaryReport.absent++
      } else if (entry.status === "leave") {
        dotColor = "orange"
        summaryReport.leave++
      } else if (entry.status === "holiday") {
        dotColor = "gray"
        summaryReport.holiday++
      }

      markedDates[entry.date.split("T")[0]] = {
        selected: true,
        selectedColor: dotColor,
      }
    })
    return { markedDates, summaryReport }
  }
  async function fetchAttendanceData() {
    setLoading(true)
    try {
      const response = await attendanceServices.getAttendanceReport(userId)
      //all approved leave
      const leaveData = await leaveServices.listAllLeaves(userId)
      const approvedLeaveData = leaveData.data.filter(
        (leave) => leave.status === "Approved"
      )
      console.log("Approved leave data hai", approvedLeaveData)
      const leaveDates = []
      approvedLeaveData.forEach((leave) => {
        const dateRange = getDateRange(leave.startDate, leave.endDate)

        leaveDates.push(...dateRange)
      })
      console.log("leave dates hai", leaveDates)
      if (!response.error) {
        const markedDates = transformAttendanceData(
          response.data.attendanceData,
          leaveDates
        )
        setAttendanceData(response.data.attendanceData)
        setCalendarData(markedDates)
      } else {
        console.log("Error fetching attendance data", response.data)
      }
    } catch (error) {
      console.log("Error fetching attendance data", error)
    }
    setLoading(false)
  }
  useEffect(() => {
    fetchAttendanceData()
  }, [])
  useEffect(() => {
    function getDate(date) {
      const d = new Date(date).toISOString().split("T")[0]
      return d
    }
    if (!loading) {
      //   const data = new Date(attendanceData[0].date)
      //   const data2 = getDate(convertUTCtoIST(data))
      //   console.log("bhejna hai data", data2)
      const data = attendanceData.filter(
        (e) => getDate(convertUTCtoIST(e.date)) === selectedDate
      )
      setDataForReport(data[0])
    }
  }, [selectedDate, loading])

  if (!loading) {
    return (
      <ScrollView>
        {/* userInfo */}

        <View style={styles.container}>
          {modalVisible && (
            <CalendarModal
              markedDate={calendarData}
              modalVisible={modalVisible}
              setModalVisible={setModalVisible}
              setSelectedDate={setSelectedDate}
            />
          )}
          {/* show summmary report */}

          <Button title="Show Calendar" onPress={() => setModalVisible(true)} />
          {dataForReport ? (
            <ListVisitForStateHead data={dataForReport} />
          ) : (
            <View style={{ flex: 1 }}>
              <Text style={styles.noData}>
                No data found for {selectedDate}
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    )
  }
}
export default AttendanceReport
const styles = StyleSheet.create({
  calendar: {
    height: 250,
  },
  container: {
    flex: 1,

    backgroundColor: "white",
  },
  button: {
    backgroundColor: "red",
    padding: 5,
    marginTop: 5,
    borderRadius: 5,

    alignSelf: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  noData: {
    marginTop: 20,
    marginBottom: 20,
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
    flex: 1,
  },
})
