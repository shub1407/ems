import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
  Button,
} from "react-native"
import React from "react"
import { useLocalSearchParams } from "expo-router"
import { FontAwesome, Ionicons } from "@expo/vector-icons"
import formatDate from "../../../src/utility/formatDate"
import { useState, useEffect } from "react"
import ShopCard from "../../../src/components/attendance/ShopCard"
import VisitedShopCard from "../../../src/components/attendance/VisitedShopCard"
import { attendanceServices } from "../../../src/services/attendanceServices"
const ListVisitForSo = ({ data }) => {
  const [visitList, setVisitList] = useState([])
  useEffect(() => {
    setVisitList(data.shopVisited)
  }, [])
  if (data.status !== "present") {
    return (
      <View style={styles.container}>
        <View style={[styles.infoCard, { minHeight: 80 }]}>
          <View>
            <Text style={styles.bold}>Date: {formatDate(data.date)}</Text>
            <View
              style={{
                backgroundColor:
                  data.status === "absent"
                    ? "red"
                    : data.status === "leave"
                    ? "#a87f32"
                    : "gray",
                padding: 10,
                borderRadius: 5,
                width: "30%",
                marginTop: 0,
                position: "absolute",
                right: 0,
                top: 0,
              }}
            >
              <Text
                style={[
                  styles.bold,
                  {
                    color: "white",
                    textTransform: "capitalize",
                    textAlign: "center",
                  },
                ]}
              >
                {data.status}
              </Text>
            </View>
          </View>
        </View>
      </View>
    )
  }
  return (
    <View style={styles.container}>
      <View style={styles.infoCard}>
        <View>
          <View
            style={{
              backgroundColor: "green",
              padding: 10,
              borderRadius: 5,
              width: "30%",
              marginBottom: 5,
              position: "absolute",
              right: 0,
              top: 0,
            }}
          >
            <Text
              style={[
                styles.bold,
                {
                  color: "white",
                  textTransform: "capitalize",
                  textAlign: "center",
                },
              ]}
            >
              {data.status}
            </Text>
          </View>
          <Text style={styles.bold}>Date: {formatDate(data.date)}</Text>

          <Text style={styles.bold}>District: {data.districtVisited}</Text>
          <Text style={styles.bold}>
            Punch In:{" "}
            {new Date(data.punchIn).toLocaleTimeString("en-GB", {
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            })}
          </Text>
          {data.punchOut && (
            <Text style={styles.bold}>
              Punch Out:{" "}
              {new Date(data.punchOut).toLocaleTimeString("en-GB", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
              })}
            </Text>
          )}

          <Text style={styles.bold}>
            Shop Visited: {data.shopVisited.length}
          </Text>
        </View>
      </View>
      {/* shop list */}
      <ScrollView>
        {/* List Shop */}
        <View>
          {data.shopVisited.map((visit) => (
            <VisitedShopCard key={visit._id} data={visit} />
          ))}
        </View>
        {/* Show the shop Visited */}
      </ScrollView>
    </View>
  )
}

export default ListVisitForSo

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  infoCard: {
    borderColor: "gray",
    borderRadius: 5,
    borderWidth: 1,
    padding: 10,
    margin: 10,
    backgroundColor: "white",
  },
  bold: {
    fontWeight: "bold",
  },
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
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  btn: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
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
})
