import { ScrollView, Pressable, View, Text, Image } from "react-native"
import { useRouter } from "expo-router"
import { useContext } from "react"
import { MyContext } from "../context/Context"
export default function SoListComponent({ data }) {
  const router = useRouter()
  const imageSource = require("../assets/photo.jpg")
  console.log("soId hai", data._id)
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
          if (role === "state_head") {
            router.navigate({
              pathname: "stateHead/manageEmployee/so-detail",
              params: { soId: data._id },
            })
          }

          if (role === "admin") {
            router.navigate({
              pathname: "admin/manageState/so-detail",
              params: { soId: data._id },
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

            {data.city.map((item, index) => (
              <View
                key={index}
                style={{
                  flex: 1,
                  paddingLeft: 5,
                  justifyContent: "center",
                }}
              >
                <Text style={{ fontWeight: "bold" }}>{item}</Text>
              </View>
            ))}

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
