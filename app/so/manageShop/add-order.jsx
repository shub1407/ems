import React, { useContext, useState } from "react"
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
import formatDate from "../../../src/utility/formatDate"
import { shopServices } from "../../../src/services/shopServices"
import { Link, useLocalSearchParams, useRouter } from "expo-router"
import DateTimePicker from "@react-native-community/datetimepicker"
import { MyContext } from "../../../src/context/Context"

function AddOrder() {
  const { shopId } = useLocalSearchParams()
  const router = useRouter()
  const [amount, setAmount] = useState(0)
  const [description, setDescription] = useState("")
  const [date, setDate] = useState(new Date())
  const [formattedDate, setFormattedDate] = useState(formatDate(new Date()))
  const [show, setShow] = useState(false)
  //Extracting so id from context for order
  const { userId } = useContext(MyContext)

  async function handleSubmit() {
    const object = {
      totalAmount: amount,
      date,
      formattedDate,
      description,
      shopId,
      so: userId,
    }
    console.log(object)
    const response = await shopServices.addOrder(object)
    console.log(response.data)

    router.back()
    router.replace({
      pathname: "./order-list",
      params: { shopId },
    })
  }
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={{ height: 100 }}>
        <Text style={styles.subheading}>Add order</Text>
      </View>
      <View>
        <Text style={styles.text}>Order Amount</Text>
        <TextInput
          style={styles.inputBox}
          placeholder="Enter Order Amount"
          keyboardType="numeric"
          value={amount}
          onChangeText={(text) => {
            setAmount(parseInt(text))
          }}
        />
      </View>
      <View style={{ position: "relative" }}>
        <Text style={styles.text}>Enter Date of order</Text>
        <TextInput
          style={styles.inputBox}
          placeholder="Enter Date of order"
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
          placeholder="Enter Description of order"
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
          <Text style={{ fontWeight: "bold", color: "white" }}>Add Order</Text>
        </TouchableHighlight>
      </View>
    </ScrollView>
  )
}
export default AddOrder
const styles = StyleSheet.create({
  container: {
    marginTop: 70,
    flex: 1,
    marginHorizontal: 20,
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
})
