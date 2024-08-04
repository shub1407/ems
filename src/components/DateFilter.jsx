import React, { useState } from "react"
import {
  View,
  Button,
  Text,
  Platform,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Pressable,
} from "react-native"
import DateTimePicker from "@react-native-community/datetimepicker"

const DateFilter = ({ onFilter, selectedOption, setSelectedOption }) => {
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())
  const [showStartDatePicker, setShowStartDatePicker] = useState(false)
  const [showEndDatePicker, setShowEndDatePicker] = useState(false)
  const [isModalVisible, setIsModalVisible] = useState(false)

  const onChangeStartDate = (event, selectedDate) => {
    const currentDate = selectedDate || startDate
    setShowStartDatePicker(Platform.OS === "ios")
    setStartDate(currentDate)
  }

  const onChangeEndDate = (event, selectedDate) => {
    const currentDate = selectedDate || endDate
    setShowEndDatePicker(Platform.OS === "ios")
    setEndDate(currentDate)
  }

  const handleFilter = (startDate, endDate) => {
    onFilter(startDate, endDate)
    setIsModalVisible(false) // Hide modal after filtering
  }

  const setThisWeek = () => {
    const startOfWeek = getStartOfWeek(new Date())
    const endOfWeek = getEndOfWeek(new Date())
    setStartDate(startOfWeek)
    setEndDate(endOfWeek)
    handleFilter(startOfWeek, endOfWeek)
    setSelectedOption("thisWeek")
  }

  const setLastWeek = () => {
    const startOfLastWeek = getStartOfLastWeek()
    const endOfLastWeek = getEndOfLastWeek()
    setStartDate(startOfLastWeek)
    setEndDate(endOfLastWeek)
    handleFilter(startOfLastWeek, endOfLastWeek)
    setSelectedOption("lastWeek")
  }

  const setThisMonth = () => {
    const startOfMonth = getStartOfMonth(new Date())
    const endOfMonth = new Date() // Current date
    setStartDate(startOfMonth)
    setEndDate(endOfMonth)
    handleFilter(startOfMonth, endOfMonth)
    setSelectedOption("thisMonth")
  }

  const setLastMonth = () => {
    const startOfLastMonth = getStartOfLastMonth()
    const endOfLastMonth = getEndOfLastMonth()
    setStartDate(startOfLastMonth)
    setEndDate(endOfLastMonth)
    handleFilter(startOfLastMonth, endOfLastMonth)
    setSelectedOption("lastMonth")
  }

  return (
    <View style={{ padding: 20 }}>
      <View style={styles.predefinedButtonsContainer}>
        <TouchableOpacity
          style={[
            styles.predefinedButton,
            selectedOption === "thisWeek" && styles.selectedButton,
          ]}
          onPress={setThisWeek}
        >
          <Text
            style={[
              styles.predefinedButtonText,
              selectedOption === "thisWeek" && styles.selectedButtonText,
            ]}
          >
            This Week
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.predefinedButton,
            selectedOption === "lastWeek" && styles.selectedButton,
          ]}
          onPress={setLastWeek}
        >
          <Text
            style={[
              styles.predefinedButtonText,
              selectedOption === "lastWeek" && styles.selectedButtonText,
            ]}
          >
            Last Week
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.predefinedButton,
            selectedOption === "thisMonth" && styles.selectedButton,
          ]}
          onPress={setThisMonth}
        >
          <Text
            style={[
              styles.predefinedButtonText,
              selectedOption === "thisMonth" && styles.selectedButtonText,
            ]}
          >
            This Month
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.predefinedButton,
            selectedOption === "lastMonth" && styles.selectedButton,
          ]}
          onPress={setLastMonth}
        >
          <Text
            style={[
              styles.predefinedButtonText,
              selectedOption === "lastMonth" && styles.selectedButtonText,
            ]}
          >
            Last Month
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.predefinedButton,
            selectedOption === "custom" && styles.selectedButton,
          ]}
          onPress={() => setIsModalVisible(true)}
        >
          <Text
            style={[
              styles.predefinedButtonText,
              selectedOption === "custom" && styles.selectedButtonText,
            ]}
          >
            Custom
          </Text>
        </TouchableOpacity>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={{ marginBottom: 20 }}>
              <Text>Start Date: {startDate.toDateString()}</Text>
              <Pressable
                style={styles.button}
                onPress={() => setShowStartDatePicker(true)}
              >
                <Text style={styles.buttonText}>Select Start Date</Text>
              </Pressable>
              {showStartDatePicker && (
                <DateTimePicker
                  testID="startDateTimePicker"
                  value={startDate}
                  mode="date"
                  display="default"
                  onChange={onChangeStartDate}
                />
              )}
            </View>

            <View>
              <Text>End Date: {endDate.toDateString()}</Text>
              <Pressable
                title="Select End Date"
                style={styles.button}
                onPress={() => setShowEndDatePicker(true)}
              >
                <Text style={styles.buttonText}>Select End Date</Text>
              </Pressable>
              {showEndDatePicker && (
                <DateTimePicker
                  testID="endDateTimePicker"
                  value={endDate}
                  mode="date"
                  display="default"
                  onChange={onChangeEndDate}
                />
              )}
            </View>

            <View style={styles.modalButtons}>
              <Pressable
                title="Apply Filter"
                style={styles.button}
                onPress={() => {
                  setSelectedOption("custom")
                  handleFilter(startDate, endDate)
                }}
              >
                <Text style={styles.buttonText}>Apply Filter</Text>
              </Pressable>
              <Pressable
                title="Cancel"
                style={styles.button}
                onPress={() => setIsModalVisible(false)}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  predefinedButtonsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "start",
    gap: 10,
    marginTop: 5,
  },
  predefinedButton: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "gray",
  },
  predefinedButtonText: {
    color: "black",
  },
  selectedButton: {
    backgroundColor: "#ff0000", // Red color
    borderColor: "#ff0000",
  },
  selectedButtonText: {
    color: "white",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "90%",
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 30,
    marginTop: 20,
  },
  button: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    textTransform: "uppercase",
  },
})

const getStartOfWeek = (date) => {
  const now = new Date(date)
  const dayOfWeek = now.getDay()
  const numDay = now.getDate()
  return new Date(now.setDate(numDay - dayOfWeek))
}

const getEndOfWeek = (date) => {
  const now = new Date(date)
  const dayOfWeek = now.getDay()
  const numDay = now.getDate()
  return new Date(now.setDate(numDay + (6 - dayOfWeek)))
}

const getStartOfMonth = (date) => {
  const now = new Date(date)
  return new Date(now.getFullYear(), now.getMonth(), 1)
}

const getStartOfLastWeek = () => {
  const now = new Date()
  return getStartOfWeek(new Date(now.setDate(now.getDate() - 7)))
}

const getEndOfLastWeek = () => {
  const now = new Date()
  return getEndOfWeek(new Date(now.setDate(now.getDate() - 7)))
}

const getStartOfLastMonth = () => {
  const now = new Date()
  return new Date(now.getFullYear(), now.getMonth() - 1, 1)
}

const getEndOfLastMonth = () => {
  const now = new Date()
  return new Date(now.getFullYear(), now.getMonth(), 0)
}

export default DateFilter
