import { View, Text, ScrollView, RefreshControl } from "react-native"
import React, { useContext } from "react"
import { useState, useEffect } from "react"
import { stateHeadServices } from "../../../src/services/stateHeadServices"
import { MyContext } from "../../../src/context/Context"
import SoListComponent from "../../../src/components/SoListComponent"
const SoList = () => {
  const [data, setData] = useState([])
  const [refreshing, setRefreshing] = useState(false)
  const { user } = useContext(MyContext)
  const state = user.state
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
          SO List
        </Text>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {
          data.map((item, index) => (
            <SoListComponent key={index} data={item} />
          ))

          // <Text>No data found</Text>

          // {data.length === 0 && <ActivityIndicator size="large" color="#0000ff" />}

          // {data.length > 0 && (
          //   <FlatList
          //     data={data}
          //     keyExtractor={(item, index) => index.toString()}
          //     renderItem={({ item }) => <SoListComponent data={item} />}
          //   />
          // )}

          // {data.length > 0 && <Text>Total Records: {data.length}</Text>}

          // {data.length > 0 && (
          //   <Button
          //     title="Refresh"
          //     onPress={() => {
          //       fetchData()
          //     }}
          //   />
        }
      </ScrollView>
    </View>
  )
}

export default SoList
