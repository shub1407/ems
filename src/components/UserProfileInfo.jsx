import { View, Text, Image, StyleSheet, TouchableHighlight } from "react-native"
import React from "react"

const UserProfileInfo = ({ user, router }) => {
  const imageSource = require("../assets/photo.jpg")
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={imageSource} style={{ width: 100, height: 100 }} />
      </View>

      {/* <Text>User Id: {user._id}</Text> */}
      <Text style={styles.name}>{user.name}</Text>
      <Text style={{ fontWeight: "bold", textTransform: "uppercase" }}>
        {user.role}
      </Text>

      <View style={{ flexDirection: "row", gap: 9 }}>
        {user?.city.map((item) => {
          return (
            <Text style={{ fontWeight: "bold" }} key={item}>
              {item}
            </Text>
          )
        })}
      </View>
      <Text style={{ fontWeight: "bold", marginTop: 10 }}>{user.state}</Text>

      <TouchableHighlight
        style={styles.btn}
        underlayColor="yellow"
        onPress={() => {
          alert("Edit profile")
          if (user.role === "so") router.navigate("/so/profile/edit-profile")
          else if (user.role === "state_head")
            router.navigate("/stateHead/profile/edit-profile")
          else if (user.role === "admin")
            router.navigate("/admin/profile/edit-profile")
        }}
      >
        <Text style={{ color: "white", fontWeight: "bold" }}>Edit Profile</Text>
      </TouchableHighlight>
    </View>
  )
}

export default UserProfileInfo

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "red",
    borderStyle: "solid",
    borderWidth: 2,
    borderRadius: 10,
    gap: 0,
  },
  imageContainer: {
    height: 100,
    width: 100,
    backgroundColor: "#ccc",
    borderRadius: 50,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    borderColor: "black",
    borderWidth: 2,
  },
  name: {
    fontSize: 20,
    textAlign: "center",
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 10,
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5,
  },
  btn: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    marginBottom: 10,
    width: 100,
    justifyContent: "center",
    alignItems: "center",
  },
})
