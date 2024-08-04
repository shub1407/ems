import React, { useContext } from "react"
import { View, Text, StyleSheet, StatusBar } from "react-native"
import { MyContext } from "../../../src/context/Context"
import UserProfileInfo from "../../../src/components/UserProfileInfo"
import { useRouter } from "expo-router"
import IconButton from "../../../src/components/IconButton"
import * as SecureStore from "expo-secure-store"
const Profile = () => {
  const router = useRouter()
  const { user, auth, setAuth } = useContext(MyContext)
  console.log("User data hai", user)
  return (
    <View style={styles.container}>
      <View style={styles.UserProfileInfo}>
        <UserProfileInfo user={user} router={router} />
      </View>
      {/* Add other screens like EditProfile, ChangePassword */}
      <View style={styles.options}>
        <View style={styles.profileOption}>
          <IconButton
            label="Setting"
            icon="settings"
            onPress={() => {
              alert("Setting pressed")
            }}
          />
          <IconButton
            label="My Orders"
            icon="clipboard"
            onPress={() => {
              alert("Setting pressed")
            }}
          />
          <IconButton
            label="Change Password"
            icon="lock-closed"
            onPress={() => {
              router.navigate("/so/profile/change-password")
            }}
          />
        </View>
        <View style={[styles.profileOption, { borderBottomWidth: 0 }]}>
          <IconButton
            label="Help & Support"
            icon="help-circle"
            onPress={() => {
              alert("Help & Support pressed")
            }}
          />
          <IconButton
            label="Logout"
            icon="log-out"
            onPress={async () => {
              // Navigate to Login screen
              await SecureStore.deleteItemAsync("token")
              router.dismissAll()
              router.replace("/(auth)/Login")
              setAuth(false)
              alert("Logout successfully")
            }}
          />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // paddingTop: StatusBar.currentHeight,
    padding: 10,
    borderWidth: 2,
    borderColor: "black",
  },
  UserProfileInfo: {
    marginTop: 5,
    flex: 2,
  },
  options: {
    flex: 3,
    marginTop: 10,
    gap: 10,
  },
  profileOption: {
    gap: 10,
    borderBottomColor: "gray",
    paddingBottom: 10,
    borderBottomWidth: 3,
  },
})

export default Profile
