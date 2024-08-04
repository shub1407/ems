import React, { useContext, useEffect, useState, useCallback } from "react"
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
} from "react-native"
import { reportServices } from "../../../src/services/reportService"
import { MyContext } from "../../../src/context/Context"
import ReportCard from "../../../src/components/ReportCard"
import { PieChart } from "react-native-chart-kit"
import PieChartCommponent from "../../../src/components/PieChartComponent"
import { useFocusEffect, useRouter } from "expo-router"
import DateFilter from "../../../src/components/DateFilter"
import SoListComponent from "../../../src/components/SoListComponent"
import { useLocalSearchParams } from "expo-router"
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
  //handle filter date
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
  const [report, setReport] = useState([])
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
  const [soInfo, setSoInfo] = useState("")
  const { soId } = useLocalSearchParams()
  const router = useRouter()
  //function to make api call
  const fetchReport = async () => {
    setLoading(true)
    const date = {
      startDate: filterStartDate,
      endDate: filterEndDate,
    }
    try {
      const response = await reportServices.generateReportForSo(soId, date)

      setReport(response.data)
      setSoInfo(response.data.soInfo)
      let baseKey
      baseKey = response.data.byDistrict

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
  }, [filterEndDate, filterStartDate])
  useFocusEffect(
    useCallback(() => {
      fetchReport()
    }, [])
  )

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
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <SoListComponent data={soInfo} />
      <View>
        <DateFilter
          onFilter={handleFilter}
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
        />
      </View>

      <View style={styles.reportCard}>
        <View style={{ marginBottom: 5 }}>
          <Text style={{ fontWeight: "bold", fontSize: 25 }}>
            Report for{" "}
            <Text style={{ textTransform: "capitalize", color: "red" }}>
              {report.soInfo.name}
            </Text>
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
          label="Total No of orders"
          data={report?.ordersCount}
          color="red"
          func={() => {
            router.navigate({
              pathname: "stateHead/manageEmployee/shop-list",
              params: {
                soId,
              },
            })
          }}
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
        <ReportCard
          label="Total No of shops"
          data={report?.totalShops}
          color="red"
        />
      </View>
      <ScrollView style={styles.chartContainer} horizontal={true} pagingEnabled>
        {/* <PieChartShow /> */}

        <PieChartCommponent
          data={totalOrderAmount}
          caption="Total orders amount"
        />
        <PieChartCommponent data={orderCount} caption="Total orders" />
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
    paddingTop: 50,
    paddingBottom: 90,
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
    paddingBottom: 40,
  },
})
