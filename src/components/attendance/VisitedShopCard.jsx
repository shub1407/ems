import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Modal,
} from "react-native"
import React from "react"
import ViewPhotoModal from "./ViewPhotoModal"
import { useState } from "react"
const VisitedShopCard = ({ data }) => {
  const imageSource = require("../../assets/photo.jpg")
  const [modalVisible, setModalVisible] = useState(false)
  console.log("data==>", data)
  return (
    <View style={styles.container}>
      {/* shop Info */}
      <View
        style={{
          flexDirection: "row",
          gap: 5,
          flex: 3,
          borderWidth: 2,
          borderColor: "gray",
          borderRadius: 5,
          padding: 4,
          justifyContent: "space-evenly",
        }}
      >
        <View style={{ flex: 1 }}>
          <View style={{ flex: 1 }}>
            <Image
              source={imageSource}
              style={{ height: "100%", width: "100%", resizeMode: "cover" }}
            />
          </View>
        </View>

        <View style={{ flex: 3 }}>
          <Text style={{ fontWeight: "bold", fontSize: 15 }}>
            {data.shopId.name}
          </Text>
          <Text>{data.shopId.phone}</Text>
          <Text>{data.shopId.email}</Text>
          <Text style={{ fontWeight: "bold" }}>Remark: {data.remark}</Text>
          {data.description && (
            <Text style={{ fontWeight: "bold", width: "95%" }}>
              Description: {data.description}
            </Text>
          )}
        </View>
      </View>
      {/* for visit  photo with locn*/}
      <TouchableOpacity
        style={{
          borderColor: "gray",
          borderWidth: 2,
          borderRadius: 5,
          padding: 4,
          flex: 1,
        }}
        onPress={() => {
          setModalVisible(true)
        }}
      >
        <Text style={{ fontWeight: "bold", textAlign: "center" }}>
          {new Date(data.date).toLocaleTimeString("en-GB", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          })}
        </Text>
        <View style={{ flex: 1 }}>
          <Image
            source={data.image ? { uri: data.image } : imageSource}
            style={{ height: "100%", width: "100%", resizeMode: "cover" }}
          />
        </View>
      </TouchableOpacity>
      {modalVisible && (
        <View>
          <ViewPhotoModal
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            imageSource={data.image ? data.image : imageSource}
            local={data.image ? false : true}
          />
        </View>
      )}
    </View>
  )
}

export default VisitedShopCard
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    margin: 10,
    gap: 15,
    justifyContent: "space-between",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,

    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    borderColor: "rgba(0, 0, 0, 0.1)",
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    height: "auto",
    width: "auto",
  },
})
