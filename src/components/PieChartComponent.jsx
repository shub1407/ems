import { View, Text, Dimensions } from "react-native"
import { PieChart } from "react-native-chart-kit"
export default function PieChartCommponent({ data, caption }) {
  return (
    <View>
      <Text
        style={{
          fontSize: 25,
          marginBottom: 10,
          color: "black",
          textAlign: "center",
          fontWeight: "bold",
        }}
      >
        {caption}
      </Text>
      <PieChart
        data={data}
        width={Dimensions.get("window").width}
        height={220}
        chartConfig={{
          backgroundColor: "#1cc910",
          backgroundGradientFrom: "#eff3ff",
          backgroundGradientTo: "#efefef",
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        }}
        accessor="numbers"
        backgroundColor="transparent"
        paddingLeft="15"
        absolute
      />
    </View>
  )
}
