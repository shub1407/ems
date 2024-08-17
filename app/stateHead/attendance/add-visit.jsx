import React, { useContext, useState, useEffect } from "react"
import { SafeAreaView } from "react-native-safe-area-context"
import { Dropdown } from "react-native-element-dropdown"
import * as SecureStore from "expo-secure-store"
import ViewPhotoModal from "../../../src/components/attendance/ViewPhotoModal"
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableHighlight,
  StatusBar,
  TouchableOpacity,
  Modal,
  ScrollView,
  Image,
} from "react-native"
import { useLocalSearchParams, router } from "expo-router"
import { attendanceServices } from "../../../src/services/attendanceServices"
import CameraWithLocation from "../../../src/components/attendance/CameraWithLocation"
import LoadingSkeleton from "../../../src/components/LoadingSkeleton"

const AddVisit = () => {
  const [remark, setRemark] = useState(null)
  const [descriptions, setDescriptions] = useState(null)
  const [modalVisible, setModalVisible] = useState(false)
  const [loading, setLoading] = useState(false)
  const [name, setName] = useState()
  const { namec, attendanceId, remarkc, descriptionc, imageUri } =
    useLocalSearchParams()
  console.log("Attendance id hai", attendanceId)
  console.log("name hai", namec)
  useEffect(() => {
    descriptionc ? setDescriptions(descriptionc) : setDescriptions(null)
    remarkc ? setRemark(remarkc) : setRemark(null)
    namec ? setName(namec) : setName(null)
  }, [])
  async function handleSubmit() {
    const formData = new FormData()
    formData.append("file", {
      uri: imageUri,
      name: "shopVisit.jpg",
      type: "image/png", // Adjust the MIME type based on the file type
    })
    formData.append("description", descriptions)
    formData.append("remark", remark)
    formData.append("name", name)
    formData.append("attendanceId", attendanceId)
    dataSent = {
      name,
      attendanceId: attendanceId,
      remark: remark,
      description: descriptions,
    }
    setLoading(true)
    try {
      const response = await attendanceServices.addVisit(formData)
      alert(response.message)
      console.log(response.data)
      router.back()
      router.replace({
        pathname: "/stateHead/attendance/mark-attendance",
      })
    } catch (error) {
      console.log("Error", error)
    }
    setLoading(false)

    console.log("data sent", dataSent)
  }
  return (
    <ScrollView style={[styles.container, { opacity: loading ? 0.4 : 1 }]}>
      <View>
        <Text
          style={{
            fontWeight: "bold",
            textAlign: "center",
            fontSize: 25,
            marginBottom: 20,
          }}
        >
          Add Visit
        </Text>
      </View>
      <View>
        <Text style={styles.text}>Name</Text>
        <TextInput
          style={[styles.inputBox]}
          placeholder="Enter your Visit Name"
          value={name}
          onChangeText={(text) => {
            setName(text)
          }}
        />
      </View>
      <View>
        <Text style={styles.text}>Remark</Text>
        <Dropdown
          style={styles.dropdown}
          data={[
            { label: "Order", value: "order" },
            { label: "Payment", value: "payment" },
            { label: "Other", value: "Other" },
          ]}
          mode="modal"
          searchPlaceholder="Search"
          labelField="label"
          valueField="value"
          placeholder="Add your Remark"
          value={remark}
          onChange={(item) => {
            setRemark(item.value)
          }}
        />
      </View>
      <View style={{ position: "relative" }}>
        <Text style={styles.text}>Enter Description</Text>
        <TextInput
          style={[styles.inputBox]}
          placeholder="Description"
          value={descriptions}
          onChangeText={(text) => {
            setDescriptions(text)
          }}
        />
      </View>

      <View>
        <Text style={styles.text}>Image</Text>
        <View
          style={[
            styles.inputBox,
            {
              position: "relative",
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            },
          ]}
        >
          {imageUri && (
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <Image
                source={{ uri: imageUri }}
                style={{
                  resizeMode: "contain",
                  height: 300,
                  width: 150,
                }}
              />
            </TouchableOpacity>
          )}
          <TouchableOpacity
            style={[styles.btn, { marginTop: 0 }]}
            onPress={() => {
              router.navigate({
                pathname: "/stateHead/attendance/take-photo",
                params: {
                  attendanceId: attendanceId,
                  remark: remark,
                  description: descriptions,
                  name: name,
                },
              })
            }}
          >
            <Text style={{ fontWeight: "bold", color: "white" }}>
              {imageUri ? "Change Photo" : "Take Photo"}
            </Text>
          </TouchableOpacity>
        </View>
        <View></View>
      </View>
      <View>
        <TouchableOpacity
          style={[styles.btn, { marginBottom: 20, opacity: loading ? 0.2 : 1 }]}
          underlayColor="yellow"
          onPress={handleSubmit}
          disabled={loading ? true : false}
        >
          <Text style={{ fontWeight: "bold", color: "white" }}>Add Visit</Text>
        </TouchableOpacity>

        {/* Modal */}
        <ViewPhotoModal
          imageSource={imageUri}
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
        />
      </View>
      {loading && <LoadingSkeleton />}
    </ScrollView>
  )
}

export default AddVisit

const styles = StyleSheet.create({
  container: {
    paddingTop: 0,
    flex: 1,
    paddingHorizontal: 40,
    backgroundColor: "white",
    paddingBottom: 10,
  },
  heading: {
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 10,
    color: "black",
  },
  subheading: {
    fontSize: 14,
    color: "gray",
    marginBottom: 10,
    fontWeight: "400",
  },
  inputBox: {
    borderColor: "gray",
    marginTop: 9,
    borderWidth: 2,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    fontSize: 16,
  },
  btn: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 5,
    marginTop: 40,
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
  text: {
    color: "red",
    fontWeight: "bold",
  },

  dropdown: {
    height: 45,
    borderColor: "gray",
    borderWidth: 2,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    padding: 2,
    marginTop: 10,
  },
  modalView: {
    height: 300,
    width: 300,
  },
})
