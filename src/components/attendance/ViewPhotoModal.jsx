import {
  View,
  Text,
  Modal,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native"
import React from "react"

const ViewPhotoModal = ({
  imageSource,
  modalVisible,
  setModalVisible,
  local,
}) => {
  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible)
        }}
      >
        <View style={styles.modalView}>
          <View style={{ position: "absolute", top: 15, left: 15 }}>
            <TouchableOpacity
              onPress={() => {
                setModalVisible(!modalVisible)
              }}
            >
              <Text
                style={{ color: "black", fontSize: 18, fontWeight: "bold" }}
              >
                Close
              </Text>
            </TouchableOpacity>
          </View>
          <Image
            source={local ? imageSource : { uri: imageSource }}
            style={{ height: "100%", width: "100%", resizeMode: "contain" }}
          />
        </View>
      </Modal>
    </View>
  )
}

export default ViewPhotoModal

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    margin: 10,
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
    position: "relative",
  },
})
