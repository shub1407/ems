import { CameraView, CameraType, useCameraPermissions } from "expo-camera"
import * as Location from "expo-location"
import { useState, useEffect, useRef } from "react"
import {
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native"
import { captureRef } from "react-native-view-shot"
import ViewShot from "react-native-view-shot"
import { router, useLocalSearchParams } from "expo-router"
import * as FileSystem from "expo-file-system"

export default function TakePhoto() {
  const [facing, setFacing] = useState("front")
  const [permission, requestPermission] = useCameraPermissions()
  const [location, setLocation] = useState(null)
  const [address, setAddress] = useState(null)
  const [currentTime, setCurrentTime] = useState(null)
  const [savedTime, setSavedTime] = useState(null)
  const cameraRef = useRef(null)
  const viewRef = useRef()
  const [imageUri, setImageUri] = useState(null)
  const [savedUri, setSavedUri] = useState(null)
  const { shopId, attendanceId, remark, description, shopName } =
    useLocalSearchParams()
  useEffect(() => {
    ;(async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync()
        if (status === "granted") {
          const loc = await Location.getCurrentPositionAsync({})
          setLocation(loc)

          const addr = await Location.reverseGeocodeAsync({
            latitude: loc.coords.latitude,
            longitude: loc.coords.longitude,
          })
          setAddress(addr[0].formattedAddress)

          const now = new Date()
          setCurrentTime(now.toLocaleString())
        } else {
          console.log("Location permission not granted")
        }
      } catch (error) {
        console.error("Error fetching location:", error)
      }
    })()
  }, [imageUri])

  if (!permission) {
    return <View />
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    )
  }

  if (!location || !address) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          Please wait while we fetch your location and address
        </Text>
      </View>
    )
  }
  //after photo is clicked

  async function takePhoto() {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync({
        quality: 1,
        base64: true,
      })
      setImageUri(photo.uri)
      setSavedTime(currentTime)
      // Optionally, you can save the photo and location data to your backend
    }
  }
  async function savePhoto() {
    let url
    // viewRef.current.capture().then((uri) => {
    //   console.log(uri)
    //   url = uri
    //   setSavedUri(uri)
    // })
    try {
      const uri = await viewRef.current.capture()
      console.log(uri)
      const base64Data = await FileSystem.readAsStringAsync(uri, {
        encoding: FileSystem.EncodingType.Base64,
      })

      // Define the path where you want to save the file
      const fileUri =
        FileSystem.documentDirectory + `screenshot${Date.now()}.png`

      // Write the base64 data to the defined path
      await FileSystem.writeAsStringAsync(fileUri, base64Data, {
        encoding: FileSystem.EncodingType.Base64,
      })
      setSavedUri(fileUri)

      console.log("Screenshot saved to:", fileUri)

      // Optionally, you can provide feedback to the user
      alert("Screenshot saved successfully!")
      router.back()
      router.replace({
        pathname: "/so/attendance/add-visit",
        params: {
          imageUri: fileUri,
          attendanceId,
          remarkc: remark,
          descriptionc: description,
          shopId,
          shopName,
        },
      })
    } catch (error) {
      console.log(error)
    }
  }

  //drawing on image
  if (imageUri) {
    return (
      <View style={styles.container}>
        <View>
          <ViewShot
            ref={viewRef}
            options={{
              // screenshot image name
              format: "jpg", // image extention
              quality: 1, // image quality
            }}
          >
            <View collapsible={false} style={[styles.camera]}>
              <Image
                source={{ uri: imageUri }}
                style={{
                  flex: 1,
                  resizeMode: "cover",
                  transform: [{ scaleX: -1 }],
                }}
              />
              <View style={styles.overlay}>
                <Text style={styles.locationText}>
                  Lat: {location.coords.latitude}, Lon:{" "}
                  {location.coords.longitude}
                </Text>
                <Text style={styles.addressText}>{address}</Text>
                <Text style={styles.currentTimeText}>{savedTime}</Text>
              </View>
            </View>
          </ViewShot>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setImageUri(null)
              setSavedTime(null)
            }}
          >
            <Text style={styles.text}>Reset</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={savePhoto}>
            <Text style={styles.text}>Save</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
  return (
    <View style={styles.container} collapsible={false} ref={viewRef}>
      <View>
        <CameraView style={styles.camera} facing="front" ref={cameraRef}>
          <View style={styles.overlay}>
            <Text style={styles.locationText}>
              Lat: {location.coords.latitude}, Lon: {location.coords.longitude}
            </Text>
            <Text style={styles.addressText}>{address}</Text>
            <Text style={styles.currentTimeText}>{currentTime}</Text>
          </View>
        </CameraView>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={takePhoto}>
          <Text style={styles.text}>Take Photo</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
  },
  camera: {
    height: "95%",
  },
  buttonContainer: {
    height: "10%",
    flexDirection: "row",

    paddingBottom: 20,
    justifyContent: "space-around",
    gap: 40,
    margin: 10,
    paddingBottom: 20,
    marginBottom: 30,
  },
  button: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",

    borderRadius: 4,
    backgroundColor: "red",
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  overlay: {
    position: "absolute",
    bottom: 10,
    left: 6,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 10,
    borderRadius: 5,
    width: "95%",
    justifyContent: "center",
    alignContent: "center",
  },
  locationText: {
    color: "white",
  },
  addressText: {
    color: "white",
    fontSize: 14,
  },
  currentTimeText: {
    color: "white",
    fontSize: 14,
  },
})
