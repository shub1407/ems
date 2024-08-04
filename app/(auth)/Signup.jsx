import React, { useState, useEffect } from "react"
import { SafeAreaView } from "react-native-safe-area-context"
import { Dropdown, MultiSelect } from "react-native-element-dropdown"
import { Country, State, City } from "country-state-city"
import { Link, useRouter } from "expo-router"
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableHighlight,
  ScrollView,
} from "react-native"

import { authServices } from "../../src/services/authServices"

function SignupComponent() {
  const [stateList, setStateList] = useState([])
  const [cityList, setCityList] = useState([])
  const router = useRouter()

  // form fields
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [phone, setPhone] = useState("")
  const [role, setRole] = useState([])
  const [state, setState] = useState("")
  const [city, setCity] = useState([])
  const [roleSet, setRoleSet] = useState(false)

  useEffect(() => {
    const a = State.getStatesOfCountry("IN")
    const b = a.map((item) => {
      return { label: item.name, value: item.name, stateCode: item.isoCode }
    })
    setStateList(b)
  }, [])

  useEffect(() => {
    if (role === "admin") {
      setState("admin")
      setRoleSet(true)
    } else {
      setRoleSet(false)
    }
  }, [role])

  async function handleSubmit() {
    const object = { name, email, password, phone, role, state, city }
    if (!name || !email || !password || !role || !phone) {
      alert("Please fill all the fields")
      return
    }
    const data = await authServices.signup(object)
    console.log(data)
    if (data.errorCode) {
      alert(data.message + "!!! Sign in to continue")
      return
    }
    alert(data.message)
    router.push("./Login")
  }

  function resetForm() {
    setName("")
    setEmail("")
    setPassword("")
    setPhone("")
    setRole([])
    setState("")
    setCity([])
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={{ height: 100 }}>
        <Text style={styles.heading}>Create your Account</Text>
        <Text style={styles.subheading}>Manage your work easily</Text>
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
          style={styles.inputBox}
          keyboardType="numeric"
          placeholder="Enter your Phone"
          value={phone}
          onChangeText={(text) => setPhone(text)}
        />
      </View>
      <View style={{ position: "relative" }}>
        <Text style={styles.text}>Enter your Password</Text>
        <TextInput
          style={styles.inputBox}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
      </View>

      {/* role & state or district based on role */}
      <View>
        <Dropdown
          style={styles.dropdown}
          data={[
            { label: "admin", value: "admin" },
            { label: "State Head", value: "state_head" },
            { label: "SO", value: "so" },
          ]}
          mode="modal"
          searchPlaceholder="Search"
          labelField="label"
          valueField="value"
          placeholder="Select your role"
          value={role}
          onChange={(item) => {
            setRole(item.value)
          }}
        />
      </View>
      {/* Based on role showing different option */}
      <View>
        {role === "so" && (
          <View>
            <Dropdown
              style={styles.dropdown}
              data={stateList}
              mode="modal"
              valueField="value"
              search
              searchPlaceholder="Search"
              labelField="label"
              placeholder="Select a state"
              value={state}
              onChange={(item) => {
                console.log(item)
                setState(item.value)
                setCity([])
                const cityObject = City.getCitiesOfState("IN", item.stateCode)
                const cityArray = cityObject.map((item) => {
                  return { label: item.name, value: item.name }
                })
                setCityList(cityArray)
              }}
            />

            <MultiSelect
              style={styles.dropdown}
              data={cityList}
              mode="modal"
              search
              searchPlaceholder="Search"
              valueField="value"
              labelField="label"
              placeholder="Select your districts"
              onChange={(item) => {
                console.log(item)
                setCity(item)
              }}
              value={city}
            />
          </View>
        )}

        {role === "state_head" && (
          <Dropdown
            style={styles.dropdown}
            data={stateList}
            valueField="value"
            search
            searchPlaceholder="Search"
            labelField="label"
            placeholder="Select a state"
            value={state}
            onChange={(item) => {
              setState(item.value)
            }}
          />
        )}
        {role === "admin" && roleSet && (
          <Text style={styles.text}>Admin role selected</Text>
        )}
      </View>
      <Link href="./Login" onPress={resetForm}>
        <View>
          <Text style={styles.text}>Already have an account? SignIn</Text>
        </View>
      </Link>
      <View>
        <TouchableHighlight
          style={styles.btn}
          underlayColor="yellow"
          onPress={handleSubmit}
        >
          <Text style={{ fontWeight: "bold", color: "white" }}>SignUp</Text>
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

export default SignupComponent
