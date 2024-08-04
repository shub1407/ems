import { View, Text, ScrollView, RefreshControl } from "react-native"
import React, { useContext } from "react"
import { useState, useEffect } from "react"
import { adminServices } from "../../../src/services/adminServices"
import { MyContext } from "../../../src/context/Context"
import StateHeadListComponent from "../../../src/components/StateHeadListComponent"
const StateHeadList = () => {
  const [data, setData] = useState([])
  const [refreshing, setRefreshing] = useState(false)
  const { user } = useContext(MyContext)
  const state = user.state
  async function fetchData() {
    try {
      const response = await adminServices.listStateHead()
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
    <View
      style={{
        backgroundColor: "white",
        minHeight: "100%",
        position: "relative",
        flex: 1,
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
          State Heads
        </Text>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {data.map((item, index) => (
          <StateHeadListComponent key={index} data={item} />
        ))}
      </ScrollView>
    </View>
  )
}

export default StateHeadList
