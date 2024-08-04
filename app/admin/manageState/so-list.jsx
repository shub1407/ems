import { View, Text, ScrollView, RefreshControl } from "react-native"
import React, { useContext } from "react"
import { useState, useEffect } from "react"
import { stateHeadServices } from "../../../src/services/stateHeadServices"
import { MyContext } from "../../../src/context/Context"
import SoListComponent from "../../../src/components/SoListComponent"
import { useLocalSearchParams } from "expo-router"
import LoadingSkeleton from "../../../src/components/LoadingSkeleton"
const SoList = () => {
  const [data, setData] = useState([])
  const [refreshing, setRefreshing] = useState(false)
  const { user } = useContext(MyContext)
  const { state } = useLocalSearchParams()
  const [loading, setLoading] = useState(true)
  async function fetchData() {
    setLoading(true)
    try {
      const response = await stateHeadServices.listSo(state)
      console.log(response.data)
      setData(response.data)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
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
  if (loading) {
    return <LoadingSkeleton />
  }
  return (
    <View
      style={{
        backgroundColor: "white",
        minHeight: "100%",
        position: "relative",
        flex: 1,

        paddingTop: 80,
        paddingBottom: 20,
        borderRadius: 10,
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
          SO List
        </Text>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {data.map((item, index) => (
          <SoListComponent key={index} data={item} />
        ))}
      </ScrollView>
    </View>
  )
}

export default SoList
