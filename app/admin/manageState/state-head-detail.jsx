import React, { useContext, useEffect, useState, useCallback } from "react"
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
  Pressable,
} from "react-native"

import { reportServices } from "../../../src/services/reportService"
import { MyContext } from "../../../src/context/Context"
import ReportCard from "../../../src/components/ReportCard"
import { PieChart } from "react-native-chart-kit"
import PieChartCommponent from "../../../src/components/PieChartComponent"
import { useFocusEffect, useLocalSearchParams, useRouter } from "expo-router"
import DateFilter from "../../../src/components/DateFilter"
import StateHeadListComponent from "../../../src/components/StateHeadListComponent"
const getRandomColor = () => {
  const letters = "0123456789ABCDEF"
  let color = "#"
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }
  return color
}
const StateHeadDetail = () => {
  const [report, setReport] = useState([])
  //handle date filter
  const [filterStartDate, setFilterStartDate] = useState(null)
  const [filterEndDate, setFilterEndDate] = useState(null)
  const [selectedOption, setSelectedOption] = useState("")
  const [stateHeadInfo, setStateHeadInfo] = useState()

  const handleFilter = (startDate, endDate) => {
    setFilterStartDate(startDate)
    setFilterEndDate(endDate)
    // Here you can fetch and filter your report data based on the selected dates
    console.log("Start Date:", startDate)
    console.log("End Date:", endDate)
  }
  //for pie chart
  const [noOfShops, setNoOfShops] = useState([])
  const [orderCount, setOrderCount] = useState([])
  //for pie chart of total orders amount
  const [totalOrderAmount, setTotalOrderAmount] = useState([])
  //for pie chart of total  payment amount
  const [totalPaymentAmount, setTotalPaymentAmount] = useState([])
  //for pie chart of total due amount
  const [totalDueAmount, setTotalDueAmount] = useState([])
  //to handle refresh
  const [refreshing, setRefreshing] = useState(false)
  const [loading, setLoading] = useState(true)
  const [reportByDistrict, setReportByDistrict] = useState(true)
  const { state } = useLocalSearchParams()
  //function to make api call
  const fetchReport = async () => {
    setLoading(true)
    const date = {
      startDate: filterStartDate,
      endDate: filterEndDate,
    }
    try {
      const response = await reportServices.generateReportForStateHead(
        state,
        date
      )

      setReport(response.data)
      setStateHeadInfo(response.data.stateHead)
      let baseKey
      if (reportByDistrict) baseKey = response.data.byDistrict
      else baseKey = response.data.bySo

      //data for pie chart of total no of shops

      let formattedData = Object.keys(baseKey).map((item) => ({
        name: baseKey[item].name,
        numbers: baseKey[item].totalShops,
        color: getRandomColor(),
        legendFontColor: "#7F7F7F",
        legendFontSize: 15,
      }))
      setNoOfShops(formattedData)
      //data for pie chart of total orders
      let orderData = Object.keys(baseKey).map((item) => ({
        name: baseKey[item].name,
        numbers: baseKey[item].totalOrders,
        color: getRandomColor(),
        legendFontColor: "#7F7F7F",
        legendFontSize: 15,
      }))
      setOrderCount(orderData)
      //data for pie chart of total orders amount
      let totalOrderAmountData = Object.keys(baseKey).map((item) => ({
        name: baseKey[item].name,
        numbers: baseKey[item].totalOrderAmount,
        color: getRandomColor(),
        legendFontColor: "#7F7F7F",
        legendFontSize: 15,
      }))
      setTotalOrderAmount(totalOrderAmountData)
      //data for pie chart of total dues
      let totalDuesData = Object.keys(baseKey).map((item) => ({
        name: baseKey[item].name,
        numbers:
          baseKey[item].totalOrderAmount - baseKey[item].totalPaymentAmount,
        color: getRandomColor(),
        legendFontColor: "#7F7F7F",
        legendFontSize: 15,
      }))
      setTotalDueAmount(totalDuesData)
      //data for pie chart of total payment amount
      let totalPaymentAmountData = Object.keys(baseKey).map((item) => ({
        name: baseKey[item].name,
        numbers: baseKey[item].totalPaymentAmount,
        color: getRandomColor(),
        legendFontColor: "#7F7F7F",
        legendFontSize: 16,
      }))
      setTotalPaymentAmount(totalPaymentAmountData)
      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchReport() // Call the fetchReport function when the component mounts.  // Call the fetchReport function when the userId changes.  // Call the fetchReport function when the component mounts.  // Call the fetchReport function when the userId changes.  // Call the fetchReport function when the component mounts.  // Call the fetchReport function when the userId changes.  // Call the fetchReport function when the component mounts.  // Call the fetchReport function when the userId changes.  // Call the fetchReport function when the component mounts.  // Call the fetchReport function when the userId changes.  // Call the fetchReport function when the component mounts.  // Call the fetchReport function when the
  }, [reportByDistrict, filterEndDate, filterStartDate])
  useFocusEffect(
    useCallback(() => {
      fetchReport()
    }, [])
  )
  const router = useRouter()
  function navigate() {
    router.navigate({
      pathname: "/admin/manageState/so-list",
      params: {
        state,
      },
    })
  }
  //refresh control
  const onRefresh = useCallback(() => {
    setRefreshing(true)

    fetchReport().then(() => {
      setRefreshing(false)
    })
  }, [])
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="red" />
      </View>
    )
  }
  console.log(selectedOption)
  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={styles.titleContainer}>
        <Text style={styles.title}>State Head Report</Text>
        <StateHeadListComponent data={stateHeadInfo[0]} />
      </View>
      <View>
        <DateFilter
          onFilter={handleFilter}
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
        />
      </View>
      <View style={styles.reportCard}>
        <View style={{ marginBottom: 10 }}>
          <Text style={{ fontWeight: "bold", fontSize: 25 }}>
            Report for {state}
          </Text>
          {filterStartDate && filterEndDate && (
            <View style={styles.filterInfo}>
              <Text
                style={{
                  color: "red",
                  fontWeight: "bold",
                }}
              >
                {filterStartDate.toDateString()} to{" "}
                {filterEndDate.toDateString()}
              </Text>
            </View>
          )}
        </View>
        <ReportCard
          label="Total No of SO"
          data={report?.noOfSo}
          color="red"
          func={navigate}
        />
        <ReportCard
          label="Total No of orders"
          data={report?.ordersCount}
          color="red"
          func={navigate}
        />
        <ReportCard
          label="Total orders amount"
          data={report?.totalOrderAmount}
          color="red"
          func={navigate}
        />
        <ReportCard
          label="Total No of shops"
          data={report?.totalShops}
          color="red"
          func={navigate}
        />

        <ReportCard
          label="Total Payment Amount"
          data={report?.totalPaymentAmount}
          color="red"
          func={navigate}
        />
      </View>
      <View style={styles.chartContainer}>
        <View style={{ flex: 1, flexDirection: "row", gap: 15, margin: 20 }}>
          <Pressable
            style={{
              backgroundColor: !reportByDistrict ? "white" : "red",
              borderRadius: 5,
              shadowColor: "white",
              shadowOpacity: 0.2,
              shadowRadius: 4,
              elevation: 2,
            }}
            onPress={() => {
              setReportByDistrict(true)
            }}
          >
            <Text
              style={{
                fontWeight: "bold",
                color: !reportByDistrict ? "black" : "white",

                padding: 10,
              }}
            >
              By District
            </Text>
          </Pressable>
          <Pressable
            style={{
              backgroundColor: reportByDistrict ? "white" : "red",
              borderRadius: 5,
              shadowColor: "white",
              shadowOpacity: 0.2,
              shadowRadius: 4,
              elevation: 2,
            }}
            onPress={() => {
              setReportByDistrict(false)
            }}
          >
            <Text
              style={{
                fontWeight: "bold",
                color: reportByDistrict ? "black" : "white",

                padding: 10,
              }}
            >
              By So
            </Text>
          </Pressable>
        </View>
        <ScrollView horizontal={true} pagingEnabled>
          {/* <PieChartShow /> */}

          <PieChartCommponent data={orderCount} caption="Total orders" />
          <PieChartCommponent
            data={totalOrderAmount}
            caption="Total orders amount"
          />
          <PieChartCommponent
            data={totalDueAmount}
            caption="Total due amount"
          />
          <PieChartCommponent
            data={totalPaymentAmount}
            caption="Total payment amount"
          />
          <PieChartCommponent data={noOfShops} caption="Total Shops" />
        </ScrollView>
      </View>
    </ScrollView>
  )
}

export default StateHeadDetail

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",

    alignContent: "center",
  },
  reportCard: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    flexShrink: 1,
    flexGrow: 1,

    justifyContent: "space-between",
    padding: 10,
    margin: 10,
  },
  title: {
    fontSize: 24,
    margin: 10,
  },
  chartContainer: {
    flex: 2,
  },
})
