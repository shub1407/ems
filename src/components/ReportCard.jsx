import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native"
import React from "react"

function ReportCard({ label, data, color, func }) {
  return (
    <TouchableOpacity style={styles.container} onPress={func}>
      <Text style={{ fontWeight: "bold", fontSize: 16 }}>{label}</Text>
      <Text style={{ color: color }}>{data}</Text>
    </TouchableOpacity>
  )
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f2f2f2",
    borderRadius: 10,
    padding: 16,
    marginBottom: 8,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    width: Dimensions.get("window").width - 40,
  },
})
export default ReportCard
