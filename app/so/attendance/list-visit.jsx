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
const ListVisit = () => {
  const {
    userId,
    districtVisited,
    date,
    punchIn,
    noOfShopVisited,
    attendanceId,
  } = useLocalSearchParams()
  console.log(noOfShopVisited)
  const [shopList, setShopList] = useState([])
  const [visitList, setVisitList] = useState([])
  const [loading, setLoading] = useState(true)
  const [loadingVisit, setLoadingVisit] = useState(true)
  const [punchOut, setPunchOut] = useState(null)
  const [modalVisible, setModalVisible] = useState(false)
  async function fetchShopListByDistrict() {
    setLoading(true)
    try {
      const response = await attendanceServices.listShopsByDistrict({
        district: districtVisited,
        soId: userId,
      })
      setShopList(response.data)
    } catch (error) {
      console.log(error)
    }

    setLoading(false)
  }
  async function listVists() {
    setLoadingVisit(true)
    try {
      const response = await attendanceServices.listVisits(attendanceId)
      console.log("visited shop hai", response.data)
      setVisitList(response.data)
      console.log("Visited list", response.data)
      response.data.punchOut && setPunchOut(response.data.punchOut)
    } catch (error) {
      console.log(error)
    }
    setLoadingVisit(false)
  }
  useEffect(() => {
    fetchShopListByDistrict()
    listVists()
  }, [])
  async function handlePunchOut() {
    try {
      const response = await attendanceServices.punchOut(attendanceId)
      setPunchOut(response.data.punchOut)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.infoCard}>
        <View>
          <Text style={styles.bold}>Date: {formatDate(date)}</Text>
          <Text style={styles.bold}>District: {districtVisited}</Text>
          <Text style={styles.bold}>
            Punch In:{" "}
            {new Date(punchIn).toLocaleTimeString("en-GB", {
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            })}
          </Text>
          {punchOut && (
            <Text style={styles.bold}>
              Punch Out:{" "}
              {new Date(punchOut).toLocaleTimeString("en-GB", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
              })}
            </Text>
          )}
          <Text style={styles.bold}>Shop Visited: {noOfShopVisited}</Text>
        </View>
        {/* Punch out btn */}
        {!punchOut && (
          <View>
            <TouchableOpacity style={styles.btn} onPress={handlePunchOut}>
              <Text style={{ color: "white", fontWeight: "bold" }}>
                Punch Out
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      {/* shop list */}
      <ScrollView>
        {/* List Shop */}
        <View>
          {!loadingVisit &&
            visitList.shopVisited.map((visit) => (
              <VisitedShopCard key={visit._id} data={visit} />
            ))}
        </View>
        {/* Show the shop Visited */}
      </ScrollView>
      {/* Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible)
        }}
      >
        <ScrollView>
          <View style={styles.modalView}>
            {/* Show the shop Visited */}
            {loading ? (
              <Text>Loading...</Text>
            ) : (
              shopList.map((shop) => (
                <ShopCard
                  key={shop._id}
                  attendanceId={attendanceId}
                  data={shop}
                />
              ))
            )}
          </View>
        </ScrollView>
      </Modal>

      {/* plus Icon */}
      {!punchOut && (
        <TouchableOpacity
          style={styles.plusIcon}
          onPress={() => {
            setModalVisible(true)
          }}
        >
          <FontAwesome size={40} name="plus" color="red" />
        </TouchableOpacity>
      )}
    </View>
  )
}

export default ListVisit

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
