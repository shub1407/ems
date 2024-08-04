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
} from "react-native"
import { MyContext } from "../../../src/context/Context"
import { useRouter } from "expo-router"
import { authServices } from "../../../src/services/authServices"
function ChangePassword() {
  const { userId } = useContext(MyContext)

  const [oPassword, setOPassword] = useState("")
  const [password, setPassword] = useState("")
  const [cPassword, setCPassword] = useState("")
  const router = useRouter()

  async function handleSubmit() {
    const object = { oPassword, password, userId }
    // const response = await authServices.login(object)
    if (cPassword !== password) {
      alert("Passwords do not match.")
      return
    }
    const response = await authServices.changePassword(object)
    if (response.error) {
      alert(response.message)
      return
    }
    if (!response.error) {
      console.log(object)

      alert(response.message)
      router.back()
      router.replace("/so/profile/")
    }
  }
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={{ height: 100 }}>
        <Text style={styles.subheading}>Change Your Password</Text>
      </View>
      <View>
        <Text style={styles.text}>Old Password</Text>
        <TextInput
          style={styles.inputBox}
          placeholder="Old Password"
          secureTextEntry
          value={oPassword}
          onChangeText={(text) => {
            setOPassword(text)
          }}
        />
      </View>
      <View style={{ position: "relative" }}>
        <Text style={styles.text}>New Password</Text>
        <TextInput
          style={styles.inputBox}
          placeholder="Enter New Password"
          secureTextEntry
          value={password}
          onChangeText={(text) => {
            setPassword(text)
          }}
        />
      </View>
      <View style={{ position: "relative" }}>
        <Text style={styles.text}>Confirm Password</Text>
        <TextInput
          style={styles.inputBox}
          placeholder="Confirm Password"
          secureTextEntry
          value={cPassword}
          onChangeText={(text) => {
            setCPassword(text)
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
            Change Password
          </Text>
        </TouchableHighlight>
      </View>
    </ScrollView>
  )
}
export default ChangePassword
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
