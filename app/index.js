import React, { useContext, useState, useEffect } from "react"
import { SafeAreaProvider } from "react-native-safe-area-context"
import { StatusBar, Text } from "react-native"
import { useRouter } from "expo-router"
import * as SecureStore from "expo-secure-store"
import { MyContext } from "../src/context/Context"
import { authServices } from "../src/services/authServices"
import RootLayout from "./_layout"
import Login from "./(auth)/Login"
import NetworkErrorPage from "../src/components/NetworkErrorPage"
import useNetworkStatus from "../src/hooks/useNetworkStatus"

function HomePage() {
  const {
    city,
    setCity,
    state,
    setState,
    token,
    setToken,
    setRole,
    role,
    setAuth,
    auth,
    setUserId,
    userId,
    user,
    setUser,
  } = useContext(MyContext)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const isConnected = useNetworkStatus() // Get network status

  async function fetchAuthStatus() {
    setLoading(true)
    const getToken = await SecureStore.getItemAsync("token")
    console.log(getToken)
    if (getToken) {
      setToken(getToken)
      // Fetch user data from API
      const response = await authServices.getAuthStatus(getToken)
      console.log("user data hai in context", response.data)
      setCity(response.data.city)
      setState(response.data.state)
      setRole(response.data.role)
      setUserId(response.data.userId)
      setUser(response.data.userDetail)
      setAuth(true)
    }
    setLoading(false)
  }

  useEffect(() => {
    // Fetch user data when app is launched
    fetchAuthStatus()
  }, [])

  useEffect(() => {
    if (!loading && auth) {
      switch (role) {
        case "so":
          router.push("/so/dashboard")
          break
        case "state_head":
          router.push("/stateHead/dashboard")
          break
        case "admin":
          router.push("/admin/dashboard")
          break
        default:
          break
      }
    }
  }, [loading, auth, role])

  if (!isConnected) {
    return <NetworkErrorPage />
  }

  return (
    <SafeAreaProvider>
      <StatusBar barStyle="dark-content" backgroundColor="red" />
      <RootLayout />
      {!auth && !loading && <Login />}
      {loading && <Text>Loading...</Text>}
    </SafeAreaProvider>
  )
}

export default HomePage
