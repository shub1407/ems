import {
  View,
  Text,
  Modal,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native"
import React from "react"
import { Calendar } from "react-native-calendars"
const CalendarModal = ({
  markedDate,
  setSelectedDate,
  modalVisible,
  setModalVisible,
}) => {
  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible)
        }}
      >
        <View style={styles.modalView}>
          <View style={{ position: "absolute", top: 10, left: 15 }}>
            <TouchableOpacity
              onPress={() => {
                setModalVisible(!modalVisible)
              }}
            >
              <Text
                style={{ color: "black", fontSize: 18, fontWeight: "bold" }}
              >
                Close
              </Text>
            </TouchableOpacity>
          </View>
          <View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 10,
              }}
            >
              <Text
                style={{
                  backgroundColor: "green",
                  padding: 5,
                  borderRadius: 5,
                  color: "white",
                }}
              >
                Present:{markedDate.summaryReport.present}
              </Text>
              <Text
                style={{
                  backgroundColor: "red",
                  padding: 5,
                  borderRadius: 5,
                  color: "white",
                }}
              >
                Absent:{markedDate.summaryReport.absent}
              </Text>
              <Text
                style={{
                  backgroundColor: "orange",
                  padding: 5,
                  borderRadius: 5,
                  color: "white",
                }}
              >
                Leave:{markedDate.summaryReport.leave}
              </Text>
              <Text
                style={{
                  backgroundColor: "gray",
                  padding: 5,
                  borderRadius: 5,
                  color: "white",
                }}
              >
                Holiday:{markedDate.summaryReport.holiday}
              </Text>
            </View>
            <Calendar
              // Customize the appearance of the calendar
              style={{
                borderWidth: 1,
                borderColor: "gray",
                height: 350,
                borderRadius: 5,
                marginTop: 20,
              }}
              // Specify the current date

              // Callback that gets called when the user selects a day
              onDayPress={(day) => {
                console.log("selected day", day.dateString)
                setSelectedDate(day.dateString)
                setModalVisible(false)
              }}
              // Mark specific dates as marked
              markedDates={markedDate.markedDates}
              theme={{
                todayTextColor: "red",
              }}
            />
          </View>
        </View>
      </Modal>
    </View>
  )
}

export default CalendarModal

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    margin: 10,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    position: "relative",
    justifyContent: "center",
    alignContent: "center",
  },
})
