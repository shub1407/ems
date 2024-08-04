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
  StatusBar,
} from "react-native"
import { reportServices } from "../../../src/services/reportService"
import { MyContext } from "../../../src/context/Context"
import ReportCard from "../../../src/components/ReportCard"
import { PieChart } from "react-native-chart-kit"
import PieChartCommponent from "../../../src/components/PieChartComponent"
import { useFocusEffect } from "expo-router"
import getDateNDaysEarlier from "../../../src/utility/getDateNDaysEarlier"
import formatDate from "../../../src/utility/formatDate"
import DateFilter from "../../../src/components/DateFilter"
import LoadingSkeleton from "../../../src/components/LoadingSkeleton"
const getRandomColor = () => {
  const letters = "0123456789ABCDEF"
  let color = "#"
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }
  return color
}
const Dashboard = () => {
  const [report, setReport] = useState([])
  const [startDate, setStartDate] = useState(getDateNDaysEarlier(7))
  console.log("Start date: " + startDate)
  //filter by date
  //handle date filter
  const [filterStartDate, setFilterStartDate] = useState(null)
  const [filterEndDate, setFilterEndDate] = useState(null)
  const [selectedOption, setSelectedOption] = useState("")

  const handleFilter = (startDate, endDate) => {
    setFilterStartDate(startDate)
    setFilterEndDate(endDate)
    // Here you can fetch and filter your report data based on the selected dates
    console.log("Start Date:", startDate)
    console.log("End Date:", endDate)
  }

  const [byDate, setByDate] = useState(false)
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
  const { state } = useContext(MyContext)
  //function to make api call
  const fetchReport = async () => {
    setLoading(true)
    let response
    try {
      if (filterEndDate && filterStartDate) {
        response = await reportServices.generateReportForAdminByDate({
          startDate: filterStartDate,
          endDate: filterEndDate,
        })
      } else {
        response = await reportServices.generateReportForAdmin()
      }
      console.log(response.data)
      setReport(response.data)
      //data for pie chart of total no of shops
      let formattedData = Object.keys(response.data.byState).map((item) => ({
        name: item,
        numbers: response.data.byState[item].totalShops,
        color: getRandomColor(),
        legendFontColor: "#7F7F7F",
        legendFontSize: 15,
      }))
      setNoOfShops(formattedData)
      //data for pie chart of total orders
      let orderData = Object.keys(response.data.byState).map((item) => ({
        name: item,
        numbers: response.data.byState[item].totalOrders,
        color: getRandomColor(),
        legendFontColor: "#7F7F7F",
        legendFontSize: 15,
      }))
      setOrderCount(orderData)
      //data for pie chart of total orders amount
      let totalOrderAmountData = Object.keys(response.data.byState).map(
        (item) => ({
          name: item,
          numbers: response.data.byState[item].totalOrderAmount,
          color: getRandomColor(),
          legendFontColor: "#7F7F7F",
          legendFontSize: 15,
        })
      )
      setTotalOrderAmount(totalOrderAmountData)
      //data for pie chart of total dues
      let totalDuesData = Object.keys(response.data.byState).map((item) => ({
        name: item,
        numbers:
          response.data.byState[item].totalOrderAmount -
          response.data.byState[item].totalPaymentAmount,
        color: getRandomColor(),
        legendFontColor: "#7F7F7F",
        legendFontSize: 15,
      }))
      setTotalDueAmount(totalDuesData)
      //data for pie chart of total payment amount
      let totalPaymentAmountData = Object.keys(response.data.byState).map(
        (item) => ({
          name: item,
          numbers: response.data.byState[item].totalPaymentAmount,
          color: getRandomColor(),
          legendFontColor: "#7F7F7F",
          legendFontSize: 16,
        })
      )
      setTotalPaymentAmount(totalPaymentAmountData)
      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }
  useEffect(() => {
    fetchReport() // Call the fetchReport function when the component mounts.  // Call the fetchReport function when the userId changes.  // Call the fetchReport function when the component mounts.  // Call the fetchReport function when the userId changes.  // Call the fetchReport function when the component mounts.  // Call the fetchReport function when the userId changes.  // Call the fetchReport function when the component mounts.  // Call the fetchReport function when the userId changes.  // Call the fetchReport function when the component mounts.  // Call the fetchReport function when the userId changes.  // Call the fetchReport function when the component mounts.  // Call the fetchReport function when the
  }, [filterEndDate, filterStartDate])
  useFocusEffect(
    useCallback(() => {
      fetchReport()
    }, [])
  )

  console.log(orderCount)
  //refresh control
  const onRefresh = useCallback(() => {
    setRefreshing(true)

    fetchReport().then(() => {
      setRefreshing(false)
    })
  }, [])
  if (loading) {
    return <LoadingSkeleton />
  }

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <StatusBar backgroundColor="red" barStyle="light-content" />
        <Text style={{ fontWeight: "bold", fontSize: 25, color: "red" }}>
          Admin Dashboard
        </Text>

        {filterEndDate && filterStartDate && (
          <Text style={{ fontWeight: "bold", fontSize: 20, color: "red" }}>
            {formatDate(filterStartDate)} - {formatDate(filterEndDate)}
          </Text>
        )}
      </View>
      {/* fiter for last week last month */}
      <View>
        <DateFilter
          onFilter={handleFilter}
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
        />
      </View>
      <View style={styles.reportCard}>
        <ReportCard
          label="Total No of orders"
          data={report?.totalOrders}
          color="red"
        />
        <ReportCard
          label="Total No of shops"
          data={report?.totalShops}
          color="red"
        />
        <ReportCard
          label="Total orders amount"
          data={report?.totalOrderAmount}
          color="red"
        />
        <ReportCard
          label="Total Payment Amount"
          data={report?.totalPaymentAmount}
          color="red"
        />
      </View>
      <ScrollView style={styles.chartContainer} horizontal={true} pagingEnabled>
        {/* <PieChartShow /> */}

        <PieChartCommponent data={orderCount} caption="Total orders" />
        <PieChartCommponent
          data={totalOrderAmount}
          caption="Total orders amount"
        />
        <PieChartCommponent data={totalDueAmount} caption="Total due amount" />
        <PieChartCommponent
          data={totalPaymentAmount}
          caption="Total payment amount"
        />
        <PieChartCommponent data={noOfShops} caption="Total Shops" />
      </ScrollView>
    </ScrollView>
  )
}

export default Dashboard

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 80,
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
    paddingBottom: 70,
  },
})
