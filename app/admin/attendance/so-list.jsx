import { View, Text, ScrollView, RefreshControl, StatusBar } from "react-native"
import React, { useContext } from "react"
import { useState, useEffect } from "react"
import { stateHeadServices } from "../../../src/services/stateHeadServices"
import { MyContext } from "../../../src/context/Context"
import SoListComponent from "../../../src/components/attendance/SoListForAttendance"
import { useLocalSearchParams } from "expo-router"
const SoList = () => {
  const [data, setData] = useState([])
  const [refreshing, setRefreshing] = useState(false)
  const { state } = useLocalSearchParams()
  async function fetchData() {
    try {
      const response = await stateHeadServices.listSo(state)
      console.log(response.data)
      setData(response.data)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    fetchData()
  }, [])
  const onRefresh = async () => {
    setRefreshing(true)
    await fetchData()
    setRefreshing(false)
  }
  console.log(data)
  return (
    <View style={{ backgroundColor: "white", flex: 1 }}>
      <View
        style={{
          backgroundColor: "white",
          minHeight: "100%",
          position: "relative",
          flex: 1,
        }}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <View>
            <Text
              style={{
                textAlign: "center",
                fontWeight: "bold",
                fontSize: 30,
              }}
            >
              SO List
            </Text>
          </View>
          <StatusBar backgroundColor="red" barStyle="light-content" />
          {data.map((item, index) => (
            <SoListComponent key={index} data={item} role="admin" />
          ))}
        </ScrollView>
      </View>
    </View>
  )
}

export default SoList
