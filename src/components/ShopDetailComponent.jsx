import React from "react"
import {
  ScrollView,
  Text,
  View,
  StyleSheet,
  Image,
  StatusBar,
} from "react-native"
export default function ShopDetailComponent({ data }) {
  const imageSource = require("../assets/photo.jpg")

  const shopId = data._id
  return (
    <ScrollView style={styles.container}>
      <StatusBar backgroundColor="red" barStyle="light-content" />
      <View style={[styles.shopDetailContainer, { paddingRight: 10 }]}>
        <View style={styles.imageContainer}>
          <Image source={imageSource} style={styles.image} />
        </View>
        <View style={styles.contentContainer}>
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 20,
              textTransform: "capitalize",
            }}
          >
            Name:-{data.name}
          </Text>
          <Text style={{ fontWeight: "bold", textTransform: "capitalize" }}>
            District: {data.city}
          </Text>
          <Text>Address:-{data.address}</Text>
          <Text>Phone:-{data.phone}</Text>
          <Text>No. of orders:-{data.totalOrderCount}</Text>
          <Text style={{ color: "green", fontWeight: "bold" }}>
            Order Amounts:-{data.totalOrderAmount}
          </Text>
          <Text style={{ color: "green", fontWeight: "bold" }}>
            Total Payment:-{data.totalPaymentAmount}
          </Text>
          <Text style={{ color: "red", fontWeight: "bold" }}>
            Due Amount: {data.totalOrderAmount - data.totalPaymentAmount}
          </Text>
          <Text>ShopId: {data._id}</Text>
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    paddingTop: 60,
  },
  shopDetailContainer: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    // flex: 1,
    height: "100%",
    flexDirection: "row",
    flexShrink: 1,
    gap: 20,
  },
  imageContainer: {
    flex: 5,
  },
  contentContainer: {
    flex: 6,
  },
  image: {
    width: "auto",
    height: "100%",

    resizeMode: "cover",
    borderRadius: 5,
    marginBottom: 10,
    marginLeft: 5,
    borderColor: "#ccc",
    borderWidth: 1,
    borderColor: "#ccc",
  },
})
