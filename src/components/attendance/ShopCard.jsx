import {
  View,
  Text,
  ScrollView,
  Pressable,
  Image,
  TouchableOpacity,
} from "react-native"
import React from "react"
import { router } from "expo-router"

const ShopCard = ({ data, attendanceId }) => {
  // shop details will be fetched from the API here
  const imageSource = require("../../assets/photo.jpg")
  return (
    <ScrollView
      style={{
        margin: 10,
        backgroundColor: "white",
        borderColor: "gray",
        borderWidth: 2,
        borderRadius: 5,
        padding: 10,
      }}
    >
      <TouchableOpacity
        onPress={() => {
          router.navigate({
            pathname: "/so/attendance/add-visit",
            params: {
              shopId: data._id,
              shopName: data.name,
              attendanceId,
            },
          })
        }}
      >
        <View style={{ flex: 1, flexDirection: "row", gap: 10 }}>
          <View style={{ flex: 1 }}>
            <Image
              source={imageSource}
              style={{ width: "100%", height: "100%", resizeMode: "cover" }}
            />
          </View>
          <View style={{ flex: 3 }}>
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 20,
                textTransform: "capitalize",
              }}
            >
              {data.name}
            </Text>
            <Text>{data.phone}</Text>
            <Text>{data.email}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </ScrollView>
  )
}

export default ShopCard
