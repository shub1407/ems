import { View, Text, StyleSheet, TouchableOpacity } from "react-native"
import React from "react"
import { FontAwesome, Ionicons } from "@expo/vector-icons"
const PlusButton = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.plusIcon} onPress={onPress}>
      <FontAwesome size={40} name="plus" color="red" />
    </TouchableOpacity>
  )
}

export default PlusButton
const styles = StyleSheet.create({
  plusIcon: {
    position: "absolute",
    bottom: 20,
    right: 25,
    zIndex: 999,
    width: 50,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    borderColor: "gray",
    borderWidth: 1,
    shadowColor: "gray",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,

    justifyContent: "center",
    alignItems: "center",
  },
})
