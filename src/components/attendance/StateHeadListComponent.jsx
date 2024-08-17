import { ScrollView, Pressable, View, Text, Image } from "react-native"
import { useRouter, useLocalSearchParams } from "expo-router"
export default function StateHeadListComponent({ data }) {
  const router = useRouter()
  const imageSource = require("../../assets/photo.jpg")

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
          router.navigate({
            pathname: "/admin/attendance/attendance-report-state-head",
            params: {
              userId: data._id,
              name: data.name,
              phone: data.phone,
              email: data.email,
              state: data.state,
            },
          })
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
              State: {data.state}
            </Text>

            <Text style={{ fontWeight: "bold" }}>Phone: {data.phone}</Text>
            <Text style={{ fontWeight: "bold" }}>Emai: {data.email}</Text>
          </View>
        </View>
      </Pressable>
    </ScrollView>
  )
}
