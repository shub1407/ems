import { View, Text, Image, StyleSheet, TouchableHighlight } from "react-native"
import React from "react"
import { useState, useEffect } from "react"
import { getFormattedDate } from "../../utility/formatDate"
const UserInfo = ({ user, general }) => {
  const imageSource = require("../../assets/photo.jpg")
  const [currentTime, setCurrentTime] = useState("")

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const hours = String(now.getHours()).padStart(2, "0")
      const minutes = String(now.getMinutes()).padStart(2, "0")
      const seconds = String(now.getSeconds()).padStart(2, "0")
      setCurrentTime(`${hours}:${minutes}:${seconds}`)
    }

    updateTime() // Update the time immediately
    const intervalId = setInterval(updateTime, 1000) // Update the time every second

    return () => clearInterval(intervalId) // Cleanup on component unmount
  }, [])
  return (
    <View style={styles.container}>
      <View style={styles.userContent}>
        {!general && (
          <View>
            <Text style={styles.boldFont}>Welcome !!</Text>
            <Text style={{ fontWeight: "bold" }}>
              Date: {getFormattedDate(Date.now())}
            </Text>
            <Text style={{ fontWeight: "bold" }}>Time: {currentTime}</Text>
          </View>
        )}
        <Text style={styles.boldFont}>{user.name}</Text>
        <Text>{user.phone}</Text>
        <Text>{user.email}</Text>
        <Text>{user.state}</Text>
        <View>
          {user.city.map((c) => {
            return <Text key={c}>{c}</Text>
          })}
        </View>
      </View>

      {!general && (
        <View style={styles.imageContainer}>
          <Image
            source={imageSource}
            style={{ width: 100, height: 100, borderRadius: 50 }}
          />
        </View>
      )}
    </View>
  )
}

export default UserInfo

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "white",
    padding: 5,
    borderColor: "red",
    borderWidth: 2,
    borderRadius: 4,
    marginTop: 8,
    justifyContent: "space-between",
  },
  userContent: {
    paddingHorizontal: 20,
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  boldFont: {
    fontWeight: "bold",
    fontSize: 18,
  },
})
