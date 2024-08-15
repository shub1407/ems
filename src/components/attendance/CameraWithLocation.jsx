import React, { useState, useEffect } from "react"
import { View, Text, StyleSheet } from "react-native"
import { Camera } from "expo-camera"
import * as Location from "expo-location"

const CameraWithLocation = () => {
  const [hasPermission, setHasPermission] = useState(null)
  const [location, setLocation] = useState(null)
  const [cameraRef, setCameraRef] = useState(null)

  useEffect(() => {
    ;(async () => {
      const { status } = await Camera.requestCameraPermissionsAsync()
      setHasPermission(status === "granted")

      const locationStatus = await Location.requestForegroundPermissionsAsync()
      if (locationStatus.status === "granted") {
        const loc = await Location.getCurrentPositionAsync({})
        setLocation(loc)
      }
    })()
  }, [])

  if (hasPermission === null) {
    return <View />
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>
  }

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} ref={(ref) => setCameraRef(ref)}>
        <View style={styles.overlay}>
          {location && (
            <Text style={styles.locationText}>
              Lat: {location.coords.latitude}, Lon: {location.coords.longitude}
            </Text>
          )}
        </View>
      </Camera>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  camera: {
    flex: 1,
  },
  overlay: {
    position: "absolute",
    top: 10,
    left: 10,
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 10,
    borderRadius: 5,
  },
  locationText: {
    color: "white",
  },
})

export default CameraWithLocation
