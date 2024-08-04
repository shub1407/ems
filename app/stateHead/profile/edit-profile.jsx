import React, { useContext } from "react"
import { SafeAreaView } from "react-native-safe-area-context"
import { Dropdown, MultiSelect } from "react-native-element-dropdown"
import { useState, useEffect } from "react"
import { Country, State, City } from "country-state-city"
import axios from "axios"
import { Link, useRouter } from "expo-router"
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableHighlight,
  StatusBar,
  ScrollView,
} from "react-native"

import { authServices } from "../../../src/services/authServices"
import { MyContext } from "../../../src/context/Context"
function EditProfile() {
  const [stateList, setStateList] = useState([])
  const [cityList, setCityList] = useState([])
  const router = useRouter()
  //form field
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [phone, setPhone] = useState("")
  const [role, setRole] = useState([])
  const [state, setState] = useState([])
  const [city, setCity] = useState([])
  const { user, setUser } = useContext(MyContext)
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    setName(user.name),
      setEmail(user.email),
      setPhone(user.phone),
      setRole(user.role),
      setState(user.state)
    setCity(user.city)
  }, [])
  console.log("user data hai in edit profile", user._id)
  console.log(city)
  async function handleSubmit() {
    const object = { name, email, phone, userId: user._id }
    const response = await authServices.updateProfile(object)
    if (response.error) {
      alert(response.message)
      alert("updated failed")
    } else {
      setUser({
        name: response.data.name,
        email: response.data.email,
        phone: response.data.phone,
        role: response.data.role,
        state: response.data.state,
        city: response.data.city,
        _id: response.data._id,
      })

      alert(response.message)
      alert("updated Successfully")
    }

    router.navigate("./")
    //TODO:api call to update the value
  }
  function resetForm() {
    setName("")
    setEmail("")
    setPassword("")
    setPhone("")
    setRole([])
    setState([])
    setCity([])
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={{ height: 100 }}>
        <Text style={styles.heading}>Edit Your Profile</Text>
      </View>
      <View>
        <Text style={styles.text}>Name</Text>
        <TextInput
          style={styles.inputBox}
          placeholder="Enter your Name"
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
          placeholder="Enter your Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
      </View>
      <View>
        <Text style={styles.text}>Phone Number</Text>
        <TextInput
          value={String(phone)}
          placeholder="Enter your Phone"
          style={styles.inputBox}
          onChangeText={(text) => setPhone(text)}
        />
      </View>
      <View>
        <Text style={styles.text}>Role</Text>
        <TextInput style={styles.inputBox} editable={false} value={role} />
      </View>
      <View>
        <Text style={styles.text}>State</Text>
        <TextInput style={styles.inputBox} editable={false} value={state} />
      </View>

      {/* role & state or district based on role */}
      <View></View>
      {/* Based on role showing different option */}

      <View>
        <TouchableHighlight
          style={styles.btn}
          underlayColor="yellow"
          onPress={handleSubmit}
        >
          <Text style={{ fontWeight: "bold", color: "white" }}>Save</Text>
        </TouchableHighlight>
      </View>
    </ScrollView>
  )
}
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
  },
})
export default EditProfile
