import React, { useState } from "react"
import { SafeAreaView } from "react-native-safe-area-context"
import * as SecureStore from "expo-secure-store"
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableHighlight,
  StatusBar,
  ScrollView,
  Keyboard,
} from "react-native"
import { Dropdown, MultiSelect } from "react-native-element-dropdown"
import formatDate from "../../../src/utility/formatDate"
import { shopServices } from "../../../src/services/shopServices"
import { Link, useLocalSearchParams, useRouter } from "expo-router"
import DateTimePicker from "@react-native-community/datetimepicker"

function AddPayment() {
  const { orderId } = useLocalSearchParams()
  const router = useRouter()
  const [amount, setAmount] = useState(0)
  const [description, setDescription] = useState("")
  const [date, setDate] = useState(new Date())
  const [paymentMethod, setPaymentMethod] = useState("")
  const [formattedDate, setFormattedDate] = useState(formatDate(new Date()))
  const [show, setShow] = useState(false)
  async function handleSubmit() {
    const object = {
      amount,
      date,
      description,
      orderId,
      paymentMethod,
    }
    console.log(object)
    const response = await shopServices.addPaymentToOrder(object)
    console.log(response.data)
    alert(response.message)
    router.back()
    router.replace({
      pathname: "./payment-list",
      params: { orderId },
    })
  }
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View>
        <View>
          <Text style={styles.text}>Payment Amount</Text>
          <TextInput
            style={styles.inputBox}
            placeholder="Enter payment Amount"
            keyboardType="numeric"
            value={amount}
            onChangeText={(text) => {
              setAmount(parseInt(text))
            }}
          />
        </View>

        <View>
          <Text style={styles.text}>Payment Method</Text>
          <Dropdown
            style={styles.dropdown}
            data={[
              { label: "Online", value: "online" },
              { label: "Cash", value: "Cash" },
            ]}
            mode="dropdown"
            labelField="label"
            valueField="value"
            placeholder="Payment Method"
            value={paymentMethod}
            onChange={(item) => {
              setPaymentMethod(item.value)
            }}
          />
        </View>
      </View>
      <View style={{ position: "relative" }}>
        <Text style={styles.text}>Enter Date of payment</Text>
        <TextInput
          style={styles.inputBox}
          placeholder="Enter Date of payment"
          value={formattedDate}
          onPress={() => {
            Keyboard.dismiss()
            setShow(true)
          }}
        />
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode="date"
            is24Hour={true}
            display="default"
            onChange={(event, selectedDate) => {
              setShow(false)
              const currentDate = selectedDate || date
              setDate(currentDate)
              setFormattedDate(formatDate(currentDate))
            }}
          />
        )}
      </View>
      <View style={{ position: "relative" }}>
        <Text style={styles.text}>Enter Description</Text>
        <TextInput
          style={styles.inputBox}
          placeholder="Enter Description of payment"
          value={description}
          onChangeText={(text) => {
            setDescription(text)
          }}
        />
      </View>
      <View>
        <TouchableHighlight
          style={styles.btn}
          underlayColor="yellow"
          onPress={handleSubmit}
        >
          <Text style={{ fontWeight: "bold", color: "white" }}>
            Add payment
          </Text>
        </TouchableHighlight>
      </View>
    </ScrollView>
  )
}
export default AddPayment
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: "white",
    paddingTop: 70,
  },
  heading: {
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 10,

    color: "black",
  },
  subheading: {
    fontSize: 14,
    color: "gray",
    marginBottom: 10,
    fontWeight: "400",
    marginBottom: 10,
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
    borderRadius: 5,
  },
  btn: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 5,
    marginTop: 40,
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
