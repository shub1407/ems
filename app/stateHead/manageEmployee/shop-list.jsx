//when user state head click on no of shop-->shopList navigate
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
} from "react-native"
import {
  Link,
  useFocusEffect,
  useLocalSearchParams,
  useRouter,
} from "expo-router"
import { FontAwesome, Ionicons } from "@expo/vector-icons"
import { stateHeadServices } from "../../../src/services/stateHeadServices"
import * as SecureStore from "expo-secure-store"
import { MyContext } from "../../../src/context/Context"
import ShopListComponent from "../../../src/components/ShopListComponent"
import SoInfoComponent from "../../../src/components/SoInfoComponent"
import SoListComponent from "../../../src/components/SoListComponent"
import LoadingSkeleton from "../../../src/components/LoadingSkeleton"

function ShopList() {
  const [soInfo, setSoInfo] = useState([])
  const { soId } = useLocalSearchParams()
  const [shopsInCity, setShopsInCity] = useState([])
  const [city, setCity] = useState("All")
  const [shops, setShops] = useState([])
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function fetchData() {
    setLoading(true)
    const response = await stateHeadServices.listShopOfSo(soId)
    setShops(response.data.shops)
    setSoInfo(response.data.so)
    setLoading(false)
  }
  useFocusEffect(
    useCallback(() => {
      fetchData()
    }, [])
  )
  useEffect(() => {
    fetchData()
  }, [])
  const cities = soInfo.city
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
          No shop found
        </Text>
      </View>
    )
  }

  return (
    <View
      style={{
        backgroundColor: "white",
        minHeight: "100%",
        position: "relative",
      }}
    >
      {/* soInfo */}
      <View style={{ paddingTop: 40 }}>
        <SoListComponent data={soInfo} />
      </View>

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
        style={{ marginBottom: 380 }}
      >
        {city === "All"
          ? shops.map((shop, index) => (
              <ShopListComponent key={index} data={shop} />
            ))
          : shopsInCity.map((shop, index) => (
              <ShopListComponent key={index} data={shop} />
            ))}
      </ScrollView>
    </View>
  )
}

export default ShopList

const styles = StyleSheet.create({
  plusIcon: {
    position: "absolute",
    top: 640,
    right: 25,
    zIndex: 999,
    width: 50,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,

    shadowOpacity: 0.8,
    shadowRadius: 2,

    justifyContent: "center",
    alignItems: "center",
  },
})
