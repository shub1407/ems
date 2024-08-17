import React, { useCallback, useContext } from "react"
import { useState, useEffect } from "react"
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Image,
  ScrollView,
  Pressable,
  ActivityIndicator,
} from "react-native"
import { Link, useFocusEffect, useRouter } from "expo-router"
import { FontAwesome, Ionicons } from "@expo/vector-icons"
import { shopServices } from "../../../src/services/shopServices"
import * as SecureStore from "expo-secure-store"
import { MyContext } from "../../../src/context/Context"
import ShopListComponent from "../../../src/components/ShopListComponent"
import LoadingSkeleton from "../../../src/components/LoadingSkeleton"
function ShopList() {
  const { token, setToken, city: cities, auth } = useContext(MyContext)

  const [shopsInCity, setShopsInCity] = useState([])
  const [city, setCity] = useState("All")
  const [shops, setShops] = useState([])
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  // if (!auth) {
  //   router.navigate("/(auth)/Login")
  //   return (
  //     <View>
  //       <Text>Please login to continue.</Text>
  //     </View>
  //   )
  // }
  async function fetchData() {
    setLoading(true)
    const response = await shopServices.getAllShops(token)
    setShops(response.data.shop)
    setLoading(false)
  }
  useFocusEffect(
    useCallback(() => {
      fetchData()
    }, [])
  )
  useEffect(() => {
    fetchData()
  }, [auth])
  useEffect(() => {
    if (city === "All") setShopsInCity(shops)
    else setShopsInCity(shops.filter((shop) => shop.city === city))
  }, [city])
  if (loading) {
    return <LoadingSkeleton />
  }
  if (!shops.length) {
    return (
      <View>
        <Text
          style={{
            fontSize: 40,
            fontWeight: "bold",
            textAlign: "center",
            minHeight: "90%",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 40,
          }}
        >
          No shop found add to continue
        </Text>
        <Pressable
          style={styles.plusIcon}
          onPress={() => {
            router.push("/so/manageShop/AddShop")
          }}
        >
          <FontAwesome size={40} name="plus" color="red" />
        </Pressable>
      </View>
    )
  }

  return (
    <View
      style={{
        backgroundColor: "white",
        minHeight: "100%",
        position: "relative",
        paddingTop: 0,
      }}
    >
      <View>
        <Text
          style={{
            textAlign: "center",
            fontWeight: "bold",
            fontSize: 30,
          }}
        >
          Shop List
        </Text>
      </View>
      <View style={{ margin: 10 }}>
        {/* Total shop */}
        <Text style={{ fontWeight: "bold", fontSize: 20, color: "red" }}>
          Total Shops: {city === "All" ? shops.length : shopsInCity.length}
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          gap: 5,
          margin: 10,
        }}
      >
        <Pressable
          onPress={() => {
            setCity("All")
          }}
          style={{
            backgroundColor: city === "All" ? "red" : "white",
            padding: 10,
            borderRadius: 10,
          }}
        >
          <Text
            style={{
              color: city === "All" ? "white" : "black",
              fontWeight: "bold",
            }}
          >
            All
          </Text>
        </Pressable>
        {cities.map((item) => {
          return (
            <Pressable
              key={item}
              onPress={() => {
                setCity(item)
              }}
              style={{
                backgroundColor: item === city ? "red" : "white",

                fontWeight: "bold",
                padding: 10,
                borderRadius: 10,
              }}
            >
              <Text
                style={{
                  color: item === city ? "white" : "black",
                  fontWeight: "bold",
                }}
              >
                {item}
              </Text>
            </Pressable>
          )
        })}
      </View>

      {/* main component */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ marginBottom: 150 }}
      >
        {city === "All"
          ? shops.map((shop, index) => (
              <ShopListComponent key={index} data={shop} />
            ))
          : shopsInCity.map((shop, index) => (
              <ShopListComponent key={index} data={shop} />
            ))}
      </ScrollView>
      {/* plus icon */}
      <Pressable
        style={styles.plusIcon}
        onPress={() => {
          router.navigate("/so/manageShop/AddShop")
        }}
      >
        <FontAwesome size={40} name="plus" color="red" />
      </Pressable>
    </View>
  )
}

export default ShopList

const styles = StyleSheet.create({
  plusIcon: {
    position: "absolute",
    bottom: 170,
    right: 25,
    zIndex: 999,
    width: 50,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    borderWidth: 0.1,
    borderColor: "gray",
    shadowOpacity: 0.8,
    shadowRadius: 2,

    justifyContent: "center",
    alignItems: "center",
  },
})
