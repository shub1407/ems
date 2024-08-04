import { ScrollView, Pressable, View, Text, Image } from "react-native"
import { useRouter } from "expo-router"
import { useContext } from "react"
import { MyContext } from "../context/Context"
export default function ListComponent({ data }) {
  const router = useRouter()
  const imageSource = require("../assets/photo.jpg")
  const { role } = useContext(MyContext)

  return (
    <ScrollView
      style={{
        margin: 10,
        backgroundColor: "white",
        borderColor: "gray",
        borderWidth: 2,
        borderRadius: 5,
        padding: 10,
      }}
    >
      <Pressable
        onPress={() => {
          if (role === "so") {
            router.navigate({
              pathname: "so/manageShop/order-list",
              params: { shopId: data._id },
            })
          } else if (role === "state_head") {
            router.navigate({
              pathname: "stateHead/manageEmployee/order-list",
              params: { shopId: data._id },
            })
          } else if (role === "admin") {
            router.navigate({
              pathname: "admin/manageState/order-list",
              params: { shopId: data._id },
            })
          }
        }}
      >
        <View style={{ flex: 1, flexDirection: "row", gap: 10 }}>
          <View style={{ flex: 2 }}>
            <Image
              source={imageSource}
              style={{ width: "100%", height: "100%", resizeMode: "cover" }}
            />
          </View>
          <View style={{ flex: 3 }}>
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 20,
                textTransform: "capitalize",
              }}
            >
              {data.name}
            </Text>
            <Text style={{ fontWeight: "bold", textTransform: "capitalize" }}>
              District: {data.city}
            </Text>
            <Text style={{ fontWeight: "bold", textTransform: "capitalize" }}>
              State: {data.state}
            </Text>

            <Text>{data.phone}</Text>

            <Text>No. of orders:-{data.totalOrderCount}</Text>
            <Text style={{ color: "green", fontWeight: "bold", fontSize: 15 }}>
              Order Amounts:-{data.totalOrderAmount}
            </Text>
            <Text style={{ color: "red", fontWeight: "bold", fontSize: 15 }}>
              Total Dues:-{data.totalOrderAmount - data.totalPaymentAmount}
            </Text>
          </View>
        </View>
      </Pressable>
    </ScrollView>
  )
}
