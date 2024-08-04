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
} from "react-native"
import { authServices } from "../../src/services/authServices"
import { Link, useRouter } from "expo-router"
import { MyContext } from "../../src/context/Context"

function Login() {
  const { token, setToken, auth, setAuth } = useContext(MyContext)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [passwordError, setPasswordError] = useState(false)
  const router = useRouter()

  async function handleLogin() {
    const object = { email, password }
    if (!email || !password) {
      setError("Please fill Email & Password")
      alert("Please fill Password and email")
      setPasswordError(true)
      return
    }

    try {
      const response = await authServices.login(object)

      console.log("Response:", response)
      const errorCode = response.errorCode
      const message = response.message

      if (response.error) {
        console.log("Error:", response.error)
        setError("An error occurred during login")
        return
      }

      if (errorCode) {
        if (errorCode === 1) {
          setError("Wrong Password")
          setPasswordError(true)
          alert("Wrong Password")
        } else if (errorCode === 2) {
          setError("User not found")
          alert("User Not Found")
          setPasswordError(true)
        }
        return
      }
      const token = response.data.token
      setToken(token)
      console.log(token)
      await SecureStore.setItemAsync("token", token)
      setToken(token)
      setAuth(true)
      setError("")
      setPasswordError(false)
      alert(message)

      router.navigate("/")
    } catch (error) {
      console.error("Login error:", error)
      setError("An error occurred. Please try again.")
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ height: 100 }}>
        <Text style={styles.heading}>Welcome Back</Text>
        <Text style={styles.subheading}>Login to your account</Text>
      </View>
      <View>
        <Text style={styles.text}>Email</Text>
        <TextInput
          style={[styles.inputBox, passwordError && styles.errorInput]}
          placeholder="Enter your Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
      </View>
      <View style={{ position: "relative" }}>
        <Text style={styles.text}>Enter your Password</Text>
        <TextInput
          style={[styles.inputBox, passwordError && styles.errorInput]}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={(text) => {
            setPassword(text)
            setPasswordError(false)
          }}
        />
        {error ? <Text style={styles.errorMessage}>{error}</Text> : null}
      </View>
      <View>
        <Text style={styles.forgotPassword}>Don't have an account?</Text>
        <Link href="./Signup">
          <Text style={{ color: "blue" }}>Click here</Text>
        </Link>
      </View>
      <View>
        <TouchableHighlight
          style={styles.btn}
          underlayColor="yellow"
          onPress={handleLogin}
        >
          <Text style={{ fontWeight: "bold", color: "white" }}>Login</Text>
        </TouchableHighlight>
      </View>
    </SafeAreaView>
  )
}

export default Login

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
  errorInput: {
    borderColor: "red",
  },
  errorMessage: {
    color: "red",
    marginTop: 5,
    fontWeight: "bold",
    fontSize: 15,
  },
  forgotPassword: {
    color: "gray",
    marginTop: 10,
  },
})
