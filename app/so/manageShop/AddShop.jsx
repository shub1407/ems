import React from "react"
import { SafeAreaView } from "react-native-safe-area-context"
import { Dropdown, MultiSelect } from "react-native-element-dropdown"
import { useState, useEffect } from "react"
import axios from "axios"
import { shopServices } from "../../../src/services/shopServices"
import { Link, useRouter } from "expo-router"
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableHighlight,
  StatusBar,
  ScrollView,
  Platform,
  Button,
  Pressable,
} from "react-native"
import * as SecureStore from "expo-secure-store"
import * as Location from "expo-location"
import { MyContext } from "../../../src/context/Context"
import { useContext } from "react"
import { FontAwesome6 } from "@expo/vector-icons"
function AddShop() {
  const { city: cities, state } = useContext(MyContext)
  console.log("cities hai", cities)
  const cityDroppDown = cities.map((city) => {
    return { label: city, value: city }
  })
  const router = useRouter()
  //form field
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [address, setAddress] = useState([])
  const [city, setCity] = useState([])
  const [location, setLocation] = useState(null)
  const [errorMsg, setErrorMsg] = useState(null)
  async function getCurrentLocation() {
    // if (Platform.OS === "android" && !Constants.isDevice) {
    //   setErrorMsg(
    //     "Oops, this will not work on an Android emulator. Try it on your device!"
    //   )
    //   return
    // }

    let { status } = await Location.requestForegroundPermissionsAsync()
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied")
      return
    }

    let location = await Location.getCurrentPositionAsync({})
    setLocation(location)
    console.log("location hai", location)
    let address = await Location.reverseGeocodeAsync({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    })
    console.log("Address hai ", address)
    setAddress(address[0].formattedAddress)
    setCity(address[0].city)
  }
  console.log("city hai", city)
  async function handleSubmit() {
    const object = { name, email, phone, address, city, state }
    const token = await SecureStore.getItemAsync("token")
    const data = await shopServices.addShop({ token, object })
    console.log(data)
    alert(data.message)
    router.push("./ShopList")
  }
  function resetForm() {
    setName("")
    setEmail("")
    setPassword("")
    setPhone("")
    setRole([])
    setAddress([])
    setCity([])
  }

  //function to extract city detail from api

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={{ height: 100 }}>
        <Text style={styles.heading}>Add Shop</Text>
        <Text style={styles.subheading}>Enter Shop Detail</Text>
      </View>
      <View>
        <Text style={styles.text}>Name</Text>
        <TextInput
          style={styles.inputBox}
          placeholder="Enter  Name"
          value={name}
          onChangeText={(text) => {
            console.log(text)
            setName(text)
          }}
        />
      </View>
      <View>
        <Text style={styles.text}>Email</Text>
        <TextInput
          style={styles.inputBox}
          placeholder="Enter  Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
      </View>
      <View>
        <Text style={styles.text}>Phone Number</Text>
        <TextInput
          style={styles.inputBox}
          keyboardType="numeric"
          placeholder="Enter  Phone"
          value={phone}
          onChangeText={(text) => setPhone(text)}
        />
      </View>
      <View>
        <Text style={styles.text}>State</Text>
        <TextInput
          style={styles.inputBox}
          keyboardType="numeric"
          placeholder="Enter  Phone"
          value={state}
          editable={false}
        />
      </View>

      <View>
        <Text style={styles.text}>District</Text>
        <Dropdown
          style={styles.dropdown}
          data={cityDroppDown}
          mode="modal"
          searchPlaceholder="Search"
          labelField="label"
          valueField="value"
          placeholder="Select District"
          value={city}
          onChange={(item) => {
            setCity(item.value)
          }}
        />
      </View>
      <View>
        <Text style={styles.text}>Address</Text>
        <View
          style={{
            flex: 1,
            flexWrap: "wrap",
            flexDirection: "row",

            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 10,
            gap: 10,
            borderColor: "gray",
            borderWidth: 1,
            borderRadius: 5,
            padding: 10,
            marginBottom: 10,
            justifyContent: "space-between",
          }}
        >
          <View style={{ width: "90%" }}>
            <TextInput
              placeholder="Enter address"
              value={address}
              onChangeText={(text) => setAddress(text)}
            />
          </View>
          <View>
            <Pressable onPress={getCurrentLocation}>
              <FontAwesome6 name="location-dot" size={24} color="red" />
            </Pressable>
          </View>
        </View>
      </View>

      <View>
        <TouchableHighlight
          style={styles.btn}
          underlayColor="yellow"
          onPress={handleSubmit}
        >
          <Text style={{ fontWeight: "bold", color: "white" }}>Add Shop</Text>
        </TouchableHighlight>
      </View>
    </ScrollView>
  )
}

export default AddShop

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
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
    color: "black",
  },
})
