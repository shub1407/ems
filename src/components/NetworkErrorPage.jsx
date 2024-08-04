import React from "react"
import { View, Text, StyleSheet } from "react-native"

function NetworkErrorPage() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>No Internet Connection</Text>
      <Text style={styles.text}>
        Please check your internet connection and try again.
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "red",
  },
  text: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
})

export default NetworkErrorPage
