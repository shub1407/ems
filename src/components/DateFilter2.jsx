import React, { useState } from "react"
import {
  View,
  Button,
  Text,
  Platform,
  TouchableOpacity,
  StyleSheet,
} from "react-native"
import DateTimePicker from "@react-native-community/datetimepicker"

const DateFilter = ({ onFilter }) => {
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())
  const [showStartDatePicker, setShowStartDatePicker] = useState(false)
  const [showEndDatePicker, setShowEndDatePicker] = useState(false)
  const [week, setWeek] = useState(false)
  const [month, setMonth] = useState(false)

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

  const handleFilter = () => {
    onFilter(startDate, endDate)
  }

  const setLastWeek = () => {
    setStartDate(getStartOfLastWeek())
    setEndDate(getEndOfLastWeek())
  }

  const setLastMonth = () => {
    setStartDate(getStartOfLastMonth())
    setEndDate(getEndOfLastMonth())
  }

  return (
    <View style={{ padding: 20 }}>
      <View style={styles.predefinedButtonsContainer}>
        <TouchableOpacity
          onPress={() => {
            setLastWeek()
            setWeek(true)
            setMonth(false)
            handleFilter()
          }}
          style={[
            styles.predefinedButton,
            {
              backgroundColor: week ? "red" : "white",
              borderWidth: week ? 0 : 2,
            },
          ]}
        >
          <Text
            style={[
              styles.predefinedButtonText,
              { color: week ? "white" : "black" },
            ]}
          >
            Last Month
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.predefinedButton,
            {
              backgroundColor: month ? "red" : "white",
              borderWidth: month ? 0 : 2,
            },
          ]}
          onPress={() => {
            setLastMonth()
            setWeek(false)
            setMonth(true)
            handleFilter()
          }}
        >
          <Text
            style={[
              styles.predefinedButtonText,
              { color: month ? "white" : "black" },
            ]}
          >
            Last Week
          </Text>
        </TouchableOpacity>
      </View>
      <Button
        title="Select Start Date"
        onPress={() => setShowStartDatePicker(true)}
      />
      {showStartDatePicker && (
        <DateTimePicker
          testID="startDateTimePicker"
          value={startDate}
          mode="date"
          display="default"
          onChange={onChangeStartDate}
        />
      )}

      <Text>Start Date: {startDate.toDateString()}</Text>

      <Button
        title="Select End Date"
        onPress={() => setShowEndDatePicker(true)}
      />
      {showEndDatePicker && (
        <DateTimePicker
          testID="endDateTimePicker"
          value={endDate}
          mode="date"
          display="default"
          onChange={onChangeEndDate}
        />
      )}

      <Text>End Date: {endDate.toDateString()}</Text>

      <Button title="Filter" onPress={handleFilter} />
    </View>
  )
}

const styles = StyleSheet.create({
  predefinedButtonsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "start",
    gap: 20,
    marginTop: 20,
  },
  predefinedButton: {
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: "gray",
  },
  predefinedButtonText: {
    color: "black",
    fontWeight: "bold",
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

const getEndOfMonth = (date) => {
  const now = new Date(date)
  return new Date(now.getFullYear(), now.getMonth() + 1, 0)
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
