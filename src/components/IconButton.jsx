import { View, Text, StyleSheet, TouchableOpacity } from "react-native"
import { FontAwesome, Ionicons } from "@expo/vector-icons"

import React from "react"

const IconButton = ({ icon, label, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.label}>
        <Text>
          <Ionicons name={icon} size={24} color="red" />
        </Text>
        <Text>{label}</Text>
      </View>

      <Text>
        <FontAwesome name="angle-right" size={24} color="red" />
      </Text>
    </TouchableOpacity>
  )
}

export default IconButton

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 10,
    shadowColor: "#000",
    borderColor: "gray",
    borderWidth: 1,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",

    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
    justifyContent: "space-between",
    gap: 8,
  },
})
